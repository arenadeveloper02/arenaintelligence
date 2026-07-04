"use client"

import { Check, Loader2 } from 'lucide-react'

interface ExecutionTimelineProps {
  steps: string[]
  currentStep: number
}

export function ExecutionTimeline({ steps, currentStep }: ExecutionTimelineProps) {
  return (
    <div className="glass-card p-6">
      <p className="section-label">AI Workflow</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Multi-agent pipeline running</h3>
      <ul className="mt-5 space-y-3">
        {steps.map((step, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <li
              key={step}
              className={`flex items-center gap-3 text-sm transition ${
                done ? 'text-emerald-300' : active ? 'text-white' : 'text-slate-600'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  done
                    ? 'border-emerald-400/40 bg-emerald-500/15'
                    : active
                      ? 'border-indigo-400/40 bg-indigo-500/15'
                      : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : active ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-300" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                )}
              </span>
              {step}
              {active && <span className="ml-auto text-xs text-indigo-300">running…</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
