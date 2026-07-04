"use client"

import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import type { RecommendationItem, PriorityLevel, DifficultyLevel } from '@/lib/types'

const PRIORITY_STYLES: Record<PriorityLevel, string> = {
  high: 'border-red-400/30 bg-red-500/10 text-red-300',
  medium: 'border-amber-400/30 bg-amber-500/10 text-amber-300',
  low: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300',
}

const DIFFICULTY_STYLES: Record<DifficultyLevel, string> = {
  easy: 'text-emerald-300',
  medium: 'text-amber-300',
  hard: 'text-red-300',
}

interface RecommendationCardProps {
  recommendation: RecommendationItem
  delay?: number
}

export function RecommendationCard({ recommendation, delay = 0 }: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20">
            <Target className="h-4 w-4 text-fuchsia-300" />
          </span>
          <h4 className="text-sm font-semibold text-white">{recommendation.title}</h4>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${PRIORITY_STYLES[recommendation.priority]}`}>
          {recommendation.priority}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{recommendation.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <span>
          Impact: <span className="text-slate-300">{recommendation.impact}</span>
        </span>
        <span>
          Difficulty: <span className={`capitalize ${DIFFICULTY_STYLES[recommendation.difficulty]}`}>{recommendation.difficulty}</span>
        </span>
      </div>
    </motion.div>
  )
}
