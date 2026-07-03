"use client"

import { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { Play, Loader2, Download, KeyRound, ChevronDown, ChevronUp, Clock, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import type { AgentConfig, ExecutionData } from '@/lib/types'

interface AgentRunnerClientProps {
  agent: AgentConfig
  hasApiKey: boolean
  executions: ExecutionData[]
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AgentRunnerClient({ agent, hasApiKey, executions }: AgentRunnerClientProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    agent.fields.forEach((f) => {
      initial[f.name] = ''
    })
    return initial
  })
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<ExecutionData[]>(executions)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleRun = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!hasApiKey || running) return
    setRunning(true)
    setError(null)
    setOutput(null)
    setProgress(8)
    const interval = window.setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 6 : p))
    }, 400)
    try {
      const res = await fetch('/api/agents/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: agent.slug, inputs: values }),
      })
      const data = (await res.json()) as {
        success: boolean
        output?: string
        error?: string
        execution?: ExecutionData
      }
      if (!res.ok || !data.success || !data.output) {
        setError(data.error ?? 'Agent execution failed. Please try again.')
      } else {
        setOutput(data.output)
        if (data.execution) {
          const exec = data.execution
          setHistory((h) => [exec, ...h])
        }
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      window.clearInterval(interval)
      setProgress(100)
      setRunning(false)
    }
  }

  const handleDownload = () => {
    if (!output) return
    const ext = agent.slug === 'keyword-research' ? 'csv' : 'md'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${agent.slug}-report.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card relative overflow-hidden p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="flex items-start gap-4">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient}`}>
            <Sparkles className="h-6 w-6 text-white" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
            <p className="mt-1 text-slate-400">{agent.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {agent.actions.map((action) => (
                <span key={action} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                  {action}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!hasApiKey && (
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <form onSubmit={handleRun} className="glass-card space-y-4 p-6">
          <h2 className="text-lg font-semibold text-white">Inputs</h2>
          {agent.fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-slate-300">
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  value={values[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  disabled={!hasApiKey}
                  required={field.required}
                  className="input-field resize-none"
                />
              ) : (
                <input
                  id={field.name}
                  type="text"
                  value={values[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  disabled={!hasApiKey}
                  required={field.required}
                  className="input-field"
                />
              )}
            </div>
          ))}
          <button type="submit" disabled={!hasApiKey || running} className="btn-gradient w-full py-3">
            {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {running ? 'Running…' : 'Run Agent'}
          </button>
        </form>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Output</h2>
            {output && !running && (
              <button type="button" onClick={handleDownload} className="btn-ghost px-4 py-2 text-xs">
                <Download className="h-3.5 w-3.5" />
                {agent.slug === 'keyword-research' ? 'Export CSV' : 'Download Report'}
              </button>
            )}
          </div>
          {running && (
            <div className="mt-6 space-y-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-sm text-slate-400">Running {agent.name}… {Math.round(Math.min(progress, 100))}%</p>
              <div className="space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          )}
          {error && !running && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}
          {output && !running && (
            <pre className="mt-4 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-sm leading-relaxed text-slate-300">
              {output}
            </pre>
          )}
          {!running && !output && !error && (
            <p className="mt-6 text-sm text-slate-500">Fill in the inputs and run the agent to see structured results here.</p>
          )}
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white">Execution History</h2>
        {history.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No executions yet for this agent.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {history.map((exec) => (
              <li key={exec.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === exec.id ? null : exec.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="flex items-center gap-2 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-slate-500" />
                    {formatDate(exec.createdAt)}
                  </span>
                  {expanded === exec.id ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                {expanded === exec.id && (
                  <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs leading-relaxed text-slate-400">
                    {exec.output}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
