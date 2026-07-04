"use client"

import { Link2, ExternalLink } from 'lucide-react'
import type { CitationItem } from '@/lib/types'

interface CitationCardProps {
  citation: CitationItem
  index: number
}

export function CitationCard({ citation, index }: CitationCardProps) {
  return (
    <div className="glass-card flex items-start gap-3 p-4">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-[11px] font-semibold text-indigo-300">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{citation.source}</p>
        {citation.note && <p className="mt-0.5 text-xs text-slate-500">{citation.note}</p>}
        {citation.url && (
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-xs text-indigo-400 transition hover:text-indigo-300"
          >
            <ExternalLink className="h-3 w-3 shrink-0" /> {citation.url}
          </a>
        )}
      </div>
      <Link2 className="h-4 w-4 shrink-0 text-slate-600" />
    </div>
  )
}
