"use client"

import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import type { InsightItem } from '@/lib/types'

interface InsightCardProps {
  insight: InsightItem
  delay?: number
}

function ScoreBar({ label, value, gradient }: { label: string; value: number; gradient: string }) {
  const pct = Math.min(Math.max(value, 0), 100)
  return (
    <div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-300">{Math.round(pct)}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div className={`h-full rounded-full bg-gradient-to-r ${gradient}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function InsightCard({ insight, delay = 0 }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-cyan-500/20">
          <Lightbulb className="h-4 w-4 text-indigo-300" />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-white">{insight.title}</h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{insight.description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <ScoreBar label="Impact" value={insight.impactScore} gradient="from-indigo-500 to-cyan-400" />
        <ScoreBar label="Confidence" value={insight.confidence} gradient="from-emerald-500 to-cyan-400" />
      </div>
    </motion.div>
  )
}
