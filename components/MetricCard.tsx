"use client"

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { MetricItem } from '@/lib/types'

interface MetricCardProps {
  metric: MetricItem
  delay?: number
}

export function MetricCard({ metric, delay = 0 }: MetricCardProps) {
  const TrendIcon = metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus
  const trendColor = metric.trend === 'up' ? 'text-emerald-300' : metric.trend === 'down' ? 'text-red-300' : 'text-slate-400'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-slate-500">{metric.label}</p>
        <TrendIcon className={`h-4 w-4 ${trendColor}`} />
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{metric.value}</p>
      {metric.context && <p className="mt-1 text-xs text-slate-500">{metric.context}</p>}
    </motion.div>
  )
}
