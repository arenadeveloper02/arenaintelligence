"use client"

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, Download, Clock, Bot } from 'lucide-react'
import { AGENT_LIST } from '@/lib/agents'
import type { ExecutionData } from '@/lib/types'

interface HistoryClientProps {
  executions: ExecutionData[]
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function agentLabel(name: string): string {
  const found = AGENT_LIST.find((a) => a.slug === name)
  return found ? found.name : name
}

export default function HistoryClient({ executions }: HistoryClientProps) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = executions.filter((e) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      e.agentName.toLowerCase().includes(q) ||
      e.input.toLowerCase().includes(q) ||
      e.output.toLowerCase().includes(q)
    )
  })

  const handleDownload = (exec: ExecutionData) => {
    const blob = new Blob([exec.output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exec.agentName}-${exec.id}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Execution History</h1>
        <p className="mt-1 text-slate-400">Every agent run is stored so you can revisit and download reports.</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across agent history…"
          className="input-field pl-11"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <Bot className="mx-auto h-10 w-10 text-slate-600" />
          <p className="mt-4 text-slate-400">
            {executions.length === 0 ? 'No agent executions yet. Run an agent to build your history.' : 'No results match your search.'}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((exec) => (
            <li key={exec.id} className="glass-card p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/20">
                    <Bot className="h-4.5 w-4.5 text-indigo-300" style={{ width: 18, height: 18 }} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{agentLabel(exec.agentName)}</p>
                    <p className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3 w-3" /> {formatDate(exec.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleDownload(exec)} className="btn-ghost px-3 py-2 text-xs">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === exec.id ? null : exec.id)}
                    className="btn-ghost px-3 py-2 text-xs"
                  >
                    {expanded === exec.id ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                    {expanded === exec.id ? 'Hide' : 'View'}
                  </button>
                </div>
              </div>
              {expanded === exec.id && (
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input</p>
                    <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs text-slate-400">
                      {exec.input}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Output</p>
                    <pre className="mt-1 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-3 text-xs leading-relaxed text-slate-400">
                      {exec.output}
                    </pre>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
