"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { SessionUser } from '@/lib/types'

interface AppShellProps {
  children: React.ReactNode
  user: SessionUser
  active: string
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', key: 'dashboard' },
  { href: '/agents/keyword-research', label: 'Keyword Research', key: 'keyword-research' },
  { href: '/agents/content-research', label: 'Content Research', key: 'content-research' },
  { href: '/agents/article-recommendation', label: 'Article Recommendation', key: 'article-recommendation' },
  { href: '/history', label: 'History', key: 'history' },
  { href: '/settings', label: 'Settings', key: 'settings' },
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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-slate-900/80 backdrop-blur transition-transform md:static md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-lg shadow-indigo-500/30" />
            <span className="text-sm font-semibold tracking-tight">INTELLIGENCE by Position2</span>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key || pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex min-h-screen flex-1 flex-col md:ml-0">
          <header className="flex h-16 items-center justify-between border-b border-white/10 bg-slate-900/50 px-6 backdrop-blur">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen((v) => !v)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white md:hidden"
                aria-label="Toggle sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              <span className="text-sm font-semibold tracking-tight md:hidden">INTELLIGENCE by Position2</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-400 sm:inline">{user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
