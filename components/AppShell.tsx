"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, KeyRound, FileSearch, Lightbulb, History, Settings, Bell, Menu, Search, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LogoMark } from '@/components/LogoMark'
import type { SessionUser } from '@/lib/types'

interface AppShellProps {
  children: React.ReactNode
  user: SessionUser
  active: string
}

interface NavItem {
  href: string
  label: string
  key: string
  icon: LucideIcon
}

interface NavSection {
  label: string
  items: NavItem[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Overview',
    items: [{ href: '/dashboard', label: 'Dashboard', key: 'dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'AI Agents',
    items: [
      { href: '/agents/keyword-research', label: 'Keyword Research', key: 'keyword-research', icon: KeyRound },
      { href: '/agents/content-research', label: 'Content Research', key: 'content-research', icon: FileSearch },
      { href: '/agents/article-recommendation', label: 'Article Recommendation', key: 'article-recommendation', icon: Lightbulb },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { href: '/history', label: 'History', key: 'history', icon: History },
      { href: '/settings', label: 'Settings', key: 'settings', icon: Settings },
    ],
  },
]

export default function AppShell({ children, user, active }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const initial = user.email.charAt(0).toUpperCase()

  return (
    <div className="relative min-h-screen bg-midnight text-white">
      <div className="mesh-bg pointer-events-none fixed inset-0 z-0" />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0 opacity-60" />
      <div className="relative z-10 flex items-start">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[280px] transform transition-transform duration-300 ease-out md:sticky md:top-0 md:bottom-auto md:h-screen md:shrink-0 md:self-start md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col overflow-hidden border-r border-white/[0.08] bg-[#080C1A]/95 backdrop-blur-xl md:m-4 md:h-[calc(100vh-2rem)] md:rounded-3xl md:border md:bg-[rgba(13,18,36,0.65)] md:shadow-glow">
            <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/[0.06] px-6">
              <LogoMark size={36} priority className="h-9 w-9 shrink-0 rounded-xl shadow-lg shadow-primary/40" />
              <span className="text-sm font-semibold tracking-tight text-white">
                INTELLIGENCE <span className="font-normal text-slate-400">by Position2</span>
              </span>
            </div>
            <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
              {NAV_SECTIONS.map((section) => (
                <div key={section.label}>
                  <p className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = active === item.key || pathname === item.href
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-primary/25 to-secondary/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-1 ring-inset ring-indigo-400/20'
                              : 'text-slate-400 hover:translate-x-0.5 hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          <Icon
                            style={{ width: 18, height: 18 }}
                            className={isActive ? 'text-indigo-300' : 'transition group-hover:text-indigo-300'}
                          />
                          {item.label}
                          {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.9)]" />}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div className="shrink-0 border-t border-white/[0.06] p-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3 transition hover:border-indigo-400/20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white shadow-lg shadow-primary/30">
                  {initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-white">{user.email}</p>
                  <p className="text-[11px] text-slate-500">Signed in</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Sign out"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#080C1A]/70 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((v) => !v)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white md:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <LogoMark size={28} className="h-7 w-7 shrink-0 rounded-lg md:hidden" />
              <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 transition focus-within:border-indigo-400/40 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] md:flex">
                <Search className="h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search agents, reports…"
                  className="w-64 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              </button>
              <Link
                href="/settings"
                aria-label="Settings"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white shadow-lg shadow-primary/30">
                {initial}
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
