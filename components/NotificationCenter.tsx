"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, BellOff, CheckCircle2, Info, AlertTriangle, XCircle, CheckCheck, Trash2, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NotificationData, NotificationType } from '@/lib/types'

const TYPE_META: Record<NotificationType, { icon: LucideIcon; text: string; bg: string; border: string }> = {
  success: { icon: CheckCircle2, text: 'text-emerald-300', bg: 'from-emerald-500/25 to-cyan-500/15', border: 'border-emerald-400/30' },
  info: { icon: Info, text: 'text-indigo-300', bg: 'from-indigo-500/25 to-cyan-500/15', border: 'border-indigo-400/30' },
  warning: { icon: AlertTriangle, text: 'text-amber-300', bg: 'from-amber-500/25 to-orange-500/15', border: 'border-amber-400/30' },
  error: { icon: XCircle, text: 'text-red-300', bg: 'from-red-500/25 to-rose-500/15', border: 'border-red-400/30' },
}

interface ToastItem {
  id: string
  type: NotificationType
  title: string
  message: string
}

function timeAgo(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value)
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function groupLabel(value: string | Date): 'Today' | 'Yesterday' | 'Earlier' {
  const d = value instanceof Date ? value : new Date(value)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)
  if (d >= startOfToday) return 'Today'
  if (d >= startOfYesterday) return 'Yesterday'
  return 'Earlier'
}

function playChime(): void {
  try {
    if (typeof window === 'undefined' || typeof window.AudioContext === 'undefined') return
    const ctx = new window.AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 830
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.45)
    window.setTimeout(() => {
      void ctx.close()
    }, 700)
  } catch {
    // sound is optional and best-effort
  }
}

export default function NotificationCenter() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const knownIdsRef = useRef<Set<string> | null>(null)

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const pushToast = useCallback((n: NotificationData) => {
    const toastId = `${n.id}-${Date.now()}`
    setToasts((prev) => [{ id: toastId, type: n.type, title: n.title, message: n.message }, ...prev].slice(0, 4))
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId))
    }, 6000)
  }, [])

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications', { cache: 'no-store' })
      if (!res.ok) return
      const data = (await res.json()) as { notifications: NotificationData[]; unreadCount: number }
      const known = knownIdsRef.current
      if (known) {
        const fresh = data.notifications.filter((n) => !n.read && !known.has(n.id))
        if (fresh.length > 0) {
          fresh.slice(0, 3).forEach((n) => pushToast(n))
          playChime()
          if ('Notification' in window && window.Notification.permission === 'granted') {
            fresh.slice(0, 3).forEach((n) => {
              try {
                new window.Notification(n.title, { body: n.message, icon: '/logo-mark.svg' })
              } catch {
                // browser notifications are best-effort
              }
            })
          }
        }
      }
      knownIdsRef.current = new Set(data.notifications.map((n) => n.id))
      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
    } catch {
      // ignore network errors; the next poll retries
    }
  }, [pushToast])

  useEffect(() => {
    void fetchNotifications()
    const interval = window.setInterval(() => {
      void fetchNotifications()
    }, 15000)
    const onRefresh = () => {
      void fetchNotifications()
    }
    window.addEventListener('notifications:refresh', onRefresh)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('notifications:refresh', onRefresh)
    }
  }, [fetchNotifications])

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const el = wrapperRef.current
      if (el && e.target instanceof Node && !el.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const handleToggle = () => {
    setOpen((v) => !v)
    if ('Notification' in window && window.Notification.permission === 'default') {
      void window.Notification.requestPermission()
    }
  }

  const markRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((c) => Math.max(0, c - 1))
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
    } catch {
      // optimistic update stays; next poll reconciles
    }
  }

  const markAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
    } catch {
      // optimistic update stays; next poll reconciles
    }
  }

  const clearAll = async () => {
    setNotifications([])
    setUnreadCount(0)
    knownIdsRef.current = new Set()
    try {
      await fetch('/api/notifications', { method: 'DELETE' })
    } catch {
      // optimistic update stays; next poll reconciles
    }
  }

  const handleItemClick = (n: NotificationData) => {
    if (!n.read) void markRead(n.id)
    setOpen(false)
    if (n.agentSlug) {
      router.push(`/agents/${n.agentSlug}`)
    } else if (n.executionId) {
      router.push('/history')
    }
  }

  const groups: { label: string; items: NotificationData[] }[] = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Earlier', items: [] },
  ]
  notifications.forEach((n) => {
    const g = groups.find((x) => x.label === groupLabel(n.createdAt))
    if (g) g.items.push(n)
  })

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        className="relative rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary px-1 text-[10px] font-semibold text-white shadow-[0_0_10px_rgba(99,102,241,0.8)]">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0A0F1F]/95 shadow-glow-lg backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-white">Notifications</p>
              <p className="text-[11px] text-slate-500">{unreadCount} unread</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                title="Mark all as read"
                onClick={() => void markAllRead()}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <CheckCheck className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Clear all"
                onClick={() => void clearAll()}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Close"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-[440px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <BellOff className="mx-auto h-8 w-8 text-slate-600" />
                <p className="mt-3 text-sm text-slate-400">You&apos;re all caught up</p>
                <p className="mt-1 text-xs text-slate-600">Run an agent to see execution updates here.</p>
              </div>
            ) : (
              groups.map(
                (group) =>
                  group.items.length > 0 && (
                    <div key={group.label}>
                      <p className="px-5 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        {group.label}
                      </p>
                      {group.items.map((n) => {
                        const meta = TYPE_META[n.type]
                        const Icon = meta.icon
                        return (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => handleItemClick(n)}
                            className={`flex w-full items-start gap-3 px-5 py-3 text-left transition hover:bg-white/[0.04] ${
                              n.read ? 'opacity-60' : ''
                            }`}
                          >
                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.bg}`}>
                              <Icon className={`h-4 w-4 ${meta.text}`} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center justify-between gap-2">
                                <span className="truncate text-sm font-medium text-white">{n.title}</span>
                                {!n.read && (
                                  <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />
                                )}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{n.message}</span>
                              <span className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
                                <span className={`rounded-full border px-2 py-0.5 ${meta.border} ${meta.text}`}>{n.category}</span>
                                <span>{timeAgo(n.createdAt)}</span>
                                {!n.read && (
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      void markRead(n.id)
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.stopPropagation()
                                        void markRead(n.id)
                                      }
                                    }}
                                    className="ml-auto font-medium text-indigo-400 transition hover:text-indigo-300"
                                  >
                                    Mark as read
                                  </span>
                                )}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  )
              )
            )}
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-3">
        {toasts.map((t) => {
          const meta = TYPE_META[t.type]
          const Icon = meta.icon
          return (
            <div
              key={t.id}
              className={`animate-fade-up pointer-events-auto flex items-start gap-3 rounded-2xl border ${meta.border} bg-[#0A0F1F]/95 p-4 shadow-glow backdrop-blur-xl`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${meta.bg}`}>
                <Icon className={`h-4 w-4 ${meta.text}`} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{t.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{t.message}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => dismissToast(t.id)}
                className="shrink-0 rounded-lg p-1 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
