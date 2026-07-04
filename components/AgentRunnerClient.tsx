"use client"

import { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { Play, Loader2, Download, KeyRound, ChevronDown, ChevronUp, Clock, AlertCircle, Sparkles, ArrowRight } from 'lucide-react'
import { ExecutionTimeline } from '@/components/ExecutionTimeline'
import ReportView from '@/components/ReportView'
import { parseAgentReport } from '@/lib/agents'
import type { AgentConfig, AgentReport, ExecutionData } from '@/lib/types'

const PIPELINE_STEPS: string[] = [
  'Understanding request',
  'Building research plan',
  'Gathering data',
  'Analyzing information',
  'Generating insights',
  'Creating recommendations',
  'Validating quality',
  'Formatting deliverables',
]

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
  const [currentStep, setCurrentStep] = useState(0)
  const [report, setReport] = useState<AgentReport | null>(null)
  const [rawOutput, setRawOutput] = useState<string | null>(null)
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
    setReport(null)
    setRawOutput(null)
    setCurrentStep(0)
    const timer = window.setInterval(() => {
      setCurrentStep((s) => Math.min(s + 1, PIPELINE_STEPS.length - 1))
    }, 1600)
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
        const parsed = parseAgentReport(data.output)
        if (parsed) {
          setReport(parsed)
        } else {
          setRawOutput(data.output)
        }
        const exec = data.execution
        if (exec) {
          setHistory((h) => [exec, ...h])
        }
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      window.clearInterval(timer)
      setCurrentStep(PIPELINE_STEPS.length)
      setRunning(false)
    }
  }

  const handleDownloadRaw = () => {
    if (!rawOutput) return
    const blob = new Blob([rawOutput], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${agent.slug}-report.md`
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

      <form onSubmit={handleRun} className="glass-card space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Inputs</h2>
          <span className="text-xs text-slate-500">Powered by a multi-agent pipeline</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {agent.fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
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
        </div>
        <button type="submit" disabled={!hasApiKey || running} className="btn-gradient w-full py-3">
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {running ? 'Running multi-agent workflow…' : 'Run Agent'}
        </button>
      </form>

      {running && <ExecutionTimeline steps={PIPELINE_STEPS} currentStep={currentStep} />}

      {error && !running && (
        <div className="glass-card flex items-start gap-3 border-red-400/30 p-5">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {report && !running && <ReportView report={report} slug={agent.slug} />}

      {rawOutput && !running && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Output</h2>
            <button type="button" onClick={handleDownloadRaw} className="btn-ghost px-4 py-2 text-xs">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
          <pre className="mt-4 max-h-[480px] overflow-auto whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-sm leading-relaxed text-slate-300">
            {rawOutput}
          </pre>
        </div>
      )}

      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white">Execution History</h2>
        {history.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No executions yet for this agent.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {history.map((exec) => {
              const isOpen = expanded === exec.id
              const parsedHistory = isOpen ? parseAgentReport(exec.output) : null
              return (
                <li key={exec.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : exec.id)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="flex items-center gap-2 text-sm text-slate-300">
                      <Clock className="h-4 w-4 text-slate-500" />
                      {formatDate(exec.createdAt)}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-4">
                      {parsedHistory ? (
                        <ReportView report={parsedHistory} slug={agent.slug} />
                      ) : (
                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs leading-relaxed text-slate-400">
                          {exec.output}
                        </pre>
                      )}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
