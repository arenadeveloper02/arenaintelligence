"use client"

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, CheckCircle2, XCircle, Ban, RotateCcw, ListTodo, ArrowUpRight, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AGENT_LIST } from '@/lib/agents'
import type { AgentJobData, JobStatus } from '@/lib/types'

const STATUS_META: Record<JobStatus, { icon: LucideIcon; label: string; classes: string; spin?: boolean }> = {
  queued: { icon: Clock, label: 'Queued', classes: 'border-slate-400/30 bg-slate-500/10 text-slate-300' },
  running: { icon: Loader2, label: 'Running', classes: 'border-indigo-400/30 bg-indigo-500/10 text-indigo-300', spin: true },
  completed: { icon: CheckCircle2, label: 'Completed', classes: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300' },
  failed: { icon: XCircle, label: 'Failed', classes: 'border-red-400/30 bg-red-500/10 text-red-300' },
  cancelled: { icon: Ban, label: 'Cancelled', classes: 'border-amber-400/30 bg-amber-500/10 text-amber-300' },
}

function agentLabel(slug: string): string {
  const found = AGENT_LIST.find((a) => a.slug === slug)
  return found ? found.name : slug
}

function formatInput(input: string): string {
  try {
    const obj = JSON.parse(input) as Record<string, string>
    return Object.values(obj)
      .filter((v) => typeof v === 'string' && v.trim().length > 0)
      .join(' · ')
  } catch {
    return input
  }
}

function formatTime(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function RunningJobsPanel() {
  const [jobs, setJobs] = useState<AgentJobData[]>([])
  const [loaded, setLoaded] = useState(false)

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('/api/jobs', { cache: 'no-store' })
      if (!res.ok) return
      const data = (await res.json()) as { jobs: AgentJobData[] }
      setJobs(data.jobs)
      setLoaded(true)
    } catch {
      // the next poll retries
    }
  }, [])

  useEffect(() => {
    void fetchJobs()
    const interval = window.setInterval(() => {
      void fetchJobs()
    }, 5000)
    return () => window.clearInterval(interval)
  }, [fetchJobs])

  const handleCancel = async (id: string) => {
    try {
      await fetch('/api/jobs/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      void fetchJobs()
    } catch {
      // best-effort; the next poll reconciles
    }
  }

  const handleRetry = async (id: string) => {
    try {
      await fetch('/api/jobs/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      void fetchJobs()
    } catch {
      // best-effort; the next poll reconciles
    }
  }

  return (
    <div className="glass-card p-6">
      {!loaded || jobs.length === 0 ? (
        <div className="py-6 text-center">
          <ListTodo className="mx-auto h-8 w-8 text-slate-600" />
          <p className="mt-3 text-sm text-slate-400">
            {loaded ? 'No background jobs yet. Run an agent to see it here.' : 'Loading jobs…'}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {jobs.slice(0, 8).map((job) => {
            const meta = STATUS_META[job.status]
            const Icon = meta.icon
            const isActive = job.status === 'queued' || job.status === 'running'
            return (
              <li key={job.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-white">{agentLabel(job.agentName)}</p>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${meta.classes}`}>
                        <Icon className={`h-3 w-3 ${meta.spin ? 'animate-spin' : ''}`} />
                        {meta.label}
                      </span>
                      {job.retryCount > 0 && (
                        <span className="text-[11px] text-slate-500">retries: {job.retryCount}</span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-500">{formatInput(job.input)}</p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Started {formatTime(job.createdAt)}
                      {job.completedAt ? ` · Finished ${formatTime(job.completedAt)}` : ''}
                    </p>
                    {job.error && <p className="mt-1 text-xs text-red-300">{job.error}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {isActive && (
                      <button
                        type="button"
                        onClick={() => void handleCancel(job.id)}
                        className="btn-ghost px-3 py-1.5 text-xs"
                      >
                        <Ban className="h-3 w-3" /> Cancel
                      </button>
                    )}
                    {(job.status === 'failed' || job.status === 'cancelled') && (
                      <button
                        type="button"
                        onClick={() => void handleRetry(job.id)}
                        className="btn-ghost px-3 py-1.5 text-xs"
                      >
                        <RotateCcw className="h-3 w-3" /> Retry
                      </button>
                    )}
                    <Link href={`/agents/${job.agentName}`} className="btn-ghost px-3 py-1.5 text-xs">
                      Open <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                {isActive && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{job.step ?? 'Queued'}</span>
                      <span>{job.progress}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.max(job.progress, 4)}%` }}
                      />
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
