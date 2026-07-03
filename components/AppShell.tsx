"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { SessionUser } from '@/lib/types'

interface AppShellProps {
  user: SessionUser
  active: string
  children: React.ReactNode
}

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', key: 'dashboard' },
  { href: '/agents/keyword-research', label: 'Keyword Research', key: 'keyword-research' },
  { href: '/agents/content-research', label: 'Content Research', key: 'content-research' },
  { href: '/agents/article-recommendation', label: 'Article Recommendation', key: 'article-recommendation' },
  { href: '/history', label: 'History', key: 'history' },
  { href: '/settings', label: 'Settings', key: 'settings' },
]

export default function AppShell({ user, active, children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen bg-[#050510] text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-[#0a0a18] transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
          <span className="text-sm font-semibold tracking-tight">INTELLIGENCE by Position2</span>
        </div>
        <nav className="px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || active === item.key
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`mb-1 block rounded-lg px-4 py-2.5 text-sm transition ${
                  isActive
                    ? 'bg-white/10 font-medium text-white'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-4">
          <div className="mb-3 truncate px-2 text-xs text-white/40">{user.email}</div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:bg-white/5"
          >
            Sign out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
            <span className="text-sm font-semibold">INTELLIGENCE by Position2</span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-white/15 p-2"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  )
}
