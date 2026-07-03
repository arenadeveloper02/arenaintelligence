"use client"

import Link from 'next/link'
import type { DashboardData, SessionUser } from '@/lib/types'
import { AGENT_LIST } from '@/lib/agents'

interface DashboardClientProps {
  user: SessionUser
  data: DashboardData
}

function formatRelative(value: string | null): string {
  if (!value) return 'Never'
  const d = new Date(value)
  return d.toLocaleString()
}

export function DashboardClient({ user, data }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">Welcome to INTELLIGENCE by Position2</h1>
        <p className="mt-2 text-sm text-slate-400">
          Signed in as {user.email}. Here&apos;s an overview of your workspace.
        </p>
      </div>

      {!data.hasApiKey && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          You haven&apos;t configured your OpenAI API key yet.{' '}
          <Link href="/settings" className="font-semibold underline">
            Add it in Settings
          </Link>{' '}
          to start running agents.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-slate-400">Total executions</div>
          <div className="mt-2 text-3xl font-bold">{data.totalExecutions}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-slate-400">API key</div>
          <div className="mt-2 text-lg font-semibold">
            {data.hasApiKey ? (
              <span className="text-emerald-400">Configured</span>
            ) : (
              <span className="text-amber-400">Not set</span>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-slate-400">Available agents</div>
          <div className="mt-2 text-3xl font-bold">{AGENT_LIST.length}</div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Agents</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENT_LIST.map((agent) => {
            const last = data.lastRuns.find((r) => r.slug === agent.slug)
            return (
              <Link
                key={agent.slug}
                href={`/agents/${agent.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
              >
                <div className={`mb-4 h-10 w-10 rounded-lg bg-gradient-to-br ${agent.gradient}`} />
                <h3 className="text-base font-semibold">{agent.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{agent.tagline}</p>
                <div className="mt-4 text-xs text-slate-500">
                  Last run: {formatRelative(last?.lastRunAt ?? null)}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent activity</h2>
        {data.recentExecutions.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-400">
            No activity yet. Run an agent to see your history in INTELLIGENCE by Position2.
          </div>
        ) : (
          <div className="space-y-3">
            {data.recentExecutions.map((exec) => (
              <div
                key={exec.id}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{exec.agentName}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(exec.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-400">{exec.input}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
