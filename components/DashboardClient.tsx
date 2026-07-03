"use client"

import Link from 'next/link'
import type { DashboardData, SessionUser } from '@/lib/types'

interface DashboardClientProps {
  data: DashboardData
  user: SessionUser
}

const AGENT_META: Record<string, { name: string; href: string; gradient: string }> = {
  'keyword-research': {
    name: 'Keyword Research',
    href: '/agents/keyword-research',
    gradient: 'from-indigo-500 to-purple-600',
  },
  'content-research': {
    name: 'Content Research',
    href: '/agents/content-research',
    gradient: 'from-sky-500 to-cyan-600',
  },
  'article-recommendation': {
    name: 'Article Recommendation',
    href: '/agents/article-recommendation',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
}

function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleString()
}

export default function DashboardClient({ data, user }: DashboardClientProps) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome to INTELLIGENCE by Position2</h1>
        <p className="mt-1 text-sm text-slate-400">Signed in as {user.email}</p>
      </div>

      {!data.hasApiKey && (
        <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-sm text-amber-200">
            You haven&apos;t configured your OpenAI API key yet.{' '}
            <Link href="/settings" className="font-semibold underline">
              Add it in Settings
            </Link>{' '}
            to start running agents.
          </p>
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Total executions</p>
          <p className="mt-2 text-3xl font-bold">{data.totalExecutions}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">API key</p>
          <p className="mt-2 text-3xl font-bold">{data.hasApiKey ? 'Configured' : 'Missing'}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-400">Active agents</p>
          <p className="mt-2 text-3xl font-bold">{data.lastRuns.length}</p>
        </div>
      </div>

      <h2 className="mb-4 text-lg font-semibold">Agents</h2>
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {data.lastRuns.map((run) => {
          const meta = AGENT_META[run.slug]
          if (!meta) return null
          return (
            <Link
              key={run.slug}
              href={meta.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
            >
              <div className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${meta.gradient} shadow-lg`} />
              <h3 className="text-lg font-semibold">{meta.name}</h3>
              <p className="mt-2 text-xs text-slate-500">
                {run.lastRunAt ? `Last run ${formatDate(run.lastRunAt)}` : 'No runs yet'}
              </p>
            </Link>
          )
        })}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Recent activity</h2>
      {data.recentExecutions.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400">
          No activity yet. Run an agent to see results here in INTELLIGENCE by Position2.
        </div>
      ) : (
        <div className="space-y-3">
          {data.recentExecutions.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{AGENT_META[e.agentName]?.name ?? e.agentName}</span>
                <span className="text-xs text-slate-500">{formatDate(e.createdAt)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-slate-400">{e.input}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
