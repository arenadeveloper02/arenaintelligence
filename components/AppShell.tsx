"use client"

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, History, Settings, LogOut, Bell, Menu, X, Sparkles, Target, BookOpen, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AGENT_LIST } from '@/lib/agents'
import type { SessionUser, AgentSlug } from '@/lib/types'

interface AppShellProps {
  user: SessionUser
  active: string
  children: ReactNode
}

const MAIN_NAV: { key: string; label: string; href: string; icon: LucideIcon }[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { key: 'history', label: 'History', href: '/history', icon: History },
  { key: 'settings', label: 'Settings', href: '/settings', icon: Settings },
]

const AGENT_ICONS: Record<AgentSlug, LucideIcon> = {
  'keyword-research': Target,
  'content-research': BookOpen,
  'article-recommendation': Lightbulb,
}

export default function AppShell({ user, active, children }: AppShellProps) {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      window.location.href = '/'
    }
  }

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
      isActive
        ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 text-white border border-indigo-400/30'
        : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
    }`

  return (
    <div className="flex min-h-screen">
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-white/10 bg-[#070a1f]/95 backdrop-blur-xl transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="font-semibold text-white">Arena Planner</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="text-slate-400 md:hidden" aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {MAIN_NAV.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.key} href={item.href} className={linkClass(active === item.key)}>
                <Icon className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
                {item.label}
              </Link>
            )
          })}
          <p className="px-3 pb-1 pt-5 text-xs font-semibold uppercase tracking-wider text-slate-600">Agents</p>
          {AGENT_LIST.map((agent) => {
            const Icon = AGENT_ICONS[agent.slug]
            return (
              <Link key={agent.slug} href={`/agents/${agent.slug}`} className={linkClass(active === agent.slug)}>
                <Icon style={{ width: 18, height: 18 }} />
                {agent.name.replace(' Agent', '')}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut style={{ width: 18, height: 18 }} />
            {loggingOut ? 'Logging out…' : 'Logout'}
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#050816]/80 px-4 py-3 backdrop-blur-xl md:px-8">
          <button type="button" onClick={() => setOpen(true)} className="text-slate-400 md:hidden" aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <button type="button" className="relative text-slate-400 transition hover:text-white" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400" />
            </button>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-semibold text-white">
                {user.email.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-sm text-slate-300 sm:block">{user.email}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
