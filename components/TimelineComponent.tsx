"use client"

import { motion } from 'framer-motion'
import type { TimelinePhase } from '@/lib/types'

interface TimelineComponentProps {
  phases: TimelinePhase[]
}

export function TimelineComponent({ phases }: TimelineComponentProps) {
  return (
    <div className="glass-card p-6">
      <ol className="relative space-y-7 border-l border-white/[0.08] pl-6">
        {phases.map((phase, i) => (
          <motion.li
            key={`${phase.phase}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[31px] top-0.5 h-3.5 w-3.5 rounded-full border-2 border-indigo-400 bg-[#080C1A] shadow-[0_0_10px_rgba(129,140,248,0.7)]" />
            <h4 className="text-sm font-semibold text-white">{phase.phase}</h4>
            <ul className="mt-2 space-y-1.5">
              {phase.actions.map((action, j) => (
                <li key={`${action}-${j}`} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {action}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  )
}
