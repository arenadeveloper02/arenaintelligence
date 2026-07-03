"use client"

import Link from 'next/link'
import { Target, BookOpen, Lightbulb, KeyRound, Play, Activity, Zap, Clock, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AGENT_LIST } from '@/lib/agents'
import type { DashboardData, SessionUser, AgentSlug } from '@/lib/types'

interface DashboardClientProps {
  user: SessionUser
  data: DashboardData
}

const AGENT_ICONS: Record<AgentSlug, LucideIcon> = {
  'keyword-research': Target,
  'content-research': BookOpen,
  'article-recommendation': Lightbulb,
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function agentLabel(name: string): string {
  const found = AGENT_LIST.find((a) => a.slug === name)
  return found ? found.name : name
}

export default function DashboardClient({ user, data }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <div className="glass-card relative overflow-hidden p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Welcome back to <span className="gradient-text">Arena Planner AI</span>
        </h1>
        <p className="mt-2 text-slate-400">{user.email} — your AI research team is ready.</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span className="text-xs uppercase tracking-wider">Total Executions</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{data.totalExecutions}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Activity className="h-4 w-4 text-indigo-400" />
              <span className="text-xs uppercase tracking-wider">Active Agents</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-white">{AGENT_LIST.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <KeyRound className="h-4 w-4 text-purple-400" />
              <span className="text-xs uppercase tracking-wider">OpenAI Key</span>
            </div>
            <p className={`mt-2 text-2xl font-bold ${data.hasApiKey ? 'text-emerald-400' : 'text-amber-400'}`}>
              {data.hasApiKey ? 'Connected' : 'Missing'}
            </p>
          </div>
        </div>
      </div>

      {!data.hasApiKey && (
        <div className="glass-card flex flex-col items-start gap-4 border-amber-400/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <KeyRound className="h-6 w-6 shrink-0 text-amber-400" />
            <p className="text-slate-300">Connect your OpenAI API key to start using AI agents.</p>
          </div>
          <Link href="/settings" className="btn-gradient shrink-0">
            Go to Settings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div id="agents" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {AGENT_LIST.map((agent) => {
          const Icon = AGENT_ICONS[agent.slug]
          const lastRun = data.lastRuns.find((r) => r.slug === agent.slug)
          return (
            <div key={agent.slug} className="glass-card glass-card-hover flex flex-col p-6">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{agent.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{agent.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                Last run: {lastRun && lastRun.lastRunAt ? formatDate(lastRun.lastRunAt) : 'Never'}
              </p>
              {data.hasApiKey ? (
                <Link href={`/agents/${agent.slug}`} className="btn-gradient mt-4 w-full">
                  <Play className="h-4 w-4" /> Run Agent
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm text-slate-500"
                >
                  <Play className="h-4 w-4" /> Run Agent
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
            <Activity className="h-5 w-5 text-cyan-400" /> Recent Activity
          </h2>
          <Link href="/history" className="flex items-center gap-1 text-sm text-indigo-300 transition hover:text-indigo-200">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {data.recentExecutions.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">No agent executions yet. Run an agent to see activity here.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/5">
            {data.recentExecutions.map((exec) => (
              <li key={exec.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-300">{agentLabel(exec.agentName)}</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {formatDate(exec.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
