"use client"

import Link from 'next/link'
import type { DashboardData, SessionUser } from '@/lib/types'

interface DashboardClientProps {
  user: SessionUser
  data: DashboardData
}

const AGENT_META: Record<string, { name: string; gradient: string; href: string }> = {
  'keyword-research': {
    name: 'Keyword Research',
    gradient: 'from-fuchsia-500 to-purple-600',
    href: '/agents/keyword-research',
  },
  'content-research': {
    name: 'Content Research',
    gradient: 'from-cyan-500 to-blue-600',
    href: '/agents/content-research',
  },
  'article-recommendation': {
    name: 'Article Recommendation',
    gradient: 'from-emerald-500 to-teal-600',
    href: '/agents/article-recommendation',
  },
}

function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleString()
}

export default function DashboardClient({ user, data }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to INTELLIGENCE by Position2</h1>
        <p className="mt-2 text-white/50">Signed in as {user.email}</p>
      </div>

      {!data.hasApiKey && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-200">
          You haven&apos;t added an OpenAI API key yet.{' '}
          <Link href="/settings" className="font-semibold underline">
            Add it in Settings
          </Link>{' '}
          to start running agents.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-sm text-white/50">Total executions</div>
          <div className="mt-2 text-3xl font-bold">{data.totalExecutions}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-sm text-white/50">API key</div>
          <div className="mt-2 text-3xl font-bold">{data.hasApiKey ? 'Active' : 'None'}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-sm text-white/50">Agents</div>
          <div className="mt-2 text-3xl font-bold">{data.lastRuns.length}</div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Your agents</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {data.lastRuns.map((run) => {
            const meta = AGENT_META[run.slug]
            if (!meta) return null
            return (
              <Link
                key={run.slug}
                href={meta.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20"
              >
                <div className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${meta.gradient}`} />
                <h3 className="font-semibold">{meta.name}</h3>
                <p className="mt-2 text-xs text-white/40">
                  {run.lastRunAt ? `Last run ${formatDate(run.lastRunAt)}` : 'No runs yet'}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent activity</h2>
        {data.recentExecutions.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/40">
            No activity yet on INTELLIGENCE by Position2. Run an agent to get started.
          </div>
        ) : (
          <div className="space-y-3">
            {data.recentExecutions.map((exec) => (
              <div
                key={exec.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {AGENT_META[exec.agentName]?.name ?? exec.agentName}
                  </span>
                  <span className="text-xs text-white/40">{formatDate(exec.createdAt)}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-xs text-white/50">{exec.input}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
