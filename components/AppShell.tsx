"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { SessionUser } from '@/lib/types'

interface AppShellProps {
  user: SessionUser
  active: string
  children: React.ReactNode
}

const NAV = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agents/keyword-research', label: 'Keyword Research' },
  { href: '/agents/content-research', label: 'Content Research' },
  { href: '/agents/article-recommendation', label: 'Article Recommendation' },
  { href: '/history', label: 'History' },
  { href: '/settings', label: 'Settings' },
]

export default function AppShell({ user, active, children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-slate-900/80 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold">
                IP
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">INTELLIGENCE</div>
                <div className="text-xs text-slate-400">by Position2</div>
              </div>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
              {NAV.map((item) => {
                const isActive = pathname === item.href || active === item.href.split('/').pop()
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-white/10 px-4 py-4">
              <div className="mb-3 truncate text-xs text-slate-400">{user.email}</div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl lg:px-8">
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2 lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
              <span className="mt-1 block h-0.5 w-5 bg-white" />
            </button>
            <div className="text-sm font-semibold lg:text-base">INTELLIGENCE by Position2</div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
          <footer className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500 lg:px-8">
            © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  )
}
