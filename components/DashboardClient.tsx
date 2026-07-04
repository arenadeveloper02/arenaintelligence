"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, KeyRound, Bot, ArrowUpRight, Clock } from 'lucide-react'
import { GlassCard } from '@/components/GlassCard'
import { SectionContainer } from '@/components/SectionContainer'
import type { DashboardData, SessionUser } from '@/lib/types'

interface DashboardClientProps {
  data: DashboardData
  user: SessionUser
}

const AGENT_META: Record<string, { name: string; href: string; gradient: string; description: string }> = {
  'keyword-research': {
    name: 'Keyword Research',
    href: '/agents/keyword-research',
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Clusters, intent classification and opportunity scores',
  },
  'content-research': {
    name: 'Content Research',
    href: '/agents/content-research',
    gradient: 'from-sky-500 to-cyan-600',
    description: 'Content gaps, user questions and article outlines',
  },
  'article-recommendation': {
    name: 'Article Recommendation',
    href: '/agents/article-recommendation',
    gradient: 'from-fuchsia-500 to-pink-600',
    description: 'Scored article ideas and publishing plans',
  },
}

function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(value)
  return d.toLocaleString()
}

export default function DashboardClient({ data, user }: DashboardClientProps) {
  return (
    <SectionContainer className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Welcome to INTELLIGENCE by Position2</h1>
        <p className="mt-1 text-sm text-slate-400">Signed in as {user.email}</p>
      </motion.div>

      {!data.hasApiKey && (
        <GlassCard hover={false} delay={0.05} className="border-warning/30 p-5">
          <p className="text-sm text-amber-200">
            You haven&apos;t configured your OpenAI API key yet.{' '}
            <Link href="/settings" className="font-semibold underline">
              Add it in Settings
            </Link>{' '}
            to start running agents.
          </p>
        </GlassCard>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard delay={0.1} className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Total executions</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20">
              <Zap className="h-4 w-4 text-indigo-300" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-white">{data.totalExecutions}</p>
        </GlassCard>
        <GlassCard delay={0.18} className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">API key</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20">
              <KeyRound className="h-4 w-4 text-emerald-300" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-white">{data.hasApiKey ? 'Configured' : 'Missing'}</p>
        </GlassCard>
        <GlassCard delay={0.26} className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Active agents</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-pink-500/20">
              <Bot className="h-4 w-4 text-fuchsia-300" />
            </span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-white">{data.lastRuns.length}</p>
        </GlassCard>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-white">Agents</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {data.lastRuns.map((run, i) => {
            const meta = AGENT_META[run.slug]
            if (!meta) return null
            return (
              <motion.div
                key={run.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Link href={meta.href} className="glass-card group block h-full p-6 transition-shadow hover:shadow-glow-lg">
                  <div className="flex items-start justify-between">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} shadow-lg`}>
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{meta.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{meta.description}</p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {run.lastRunAt ? `Last run ${formatDate(run.lastRunAt)}` : 'No runs yet'}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold text-white">Recent activity</h2>
        {data.recentExecutions.length === 0 ? (
          <GlassCard hover={false} delay={0.4} className="p-10 text-center">
            <Bot className="mx-auto h-10 w-10 text-slate-600" />
            <p className="mt-4 text-sm text-slate-400">
              No activity yet. Run an agent to see results here in INTELLIGENCE by Position2.
            </p>
          </GlassCard>
        ) : (
          <GlassCard hover={false} delay={0.4} className="divide-y divide-white/[0.06] overflow-hidden !p-0">
            {data.recentExecutions.map((e) => (
              <div key={e.id} className="px-6 py-4 transition hover:bg-white/[0.03]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">
                    {AGENT_META[e.agentName]?.name ?? e.agentName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {formatDate(e.createdAt)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{e.input}</p>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </SectionContainer>
  )
}
