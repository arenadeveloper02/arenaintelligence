"use client"

import { FileJson, FileSpreadsheet, FileText } from 'lucide-react'
import type { AgentReport } from '@/lib/types'

interface ExportCardProps {
  report: AgentReport
  slug: string
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function csvEscape(v: string): string {
  return `"${v.replace(/"/g, '""')}"`
}

function toCsv(report: AgentReport): string {
  if (report.keywords && report.keywords.length > 0) {
    const header = 'keyword,cluster,intent,volume,difficulty,opportunity_score'
    const rows = report.keywords.map((k) =>
      [csvEscape(k.keyword), csvEscape(k.cluster), csvEscape(k.intent), csvEscape(k.volumeEstimate), csvEscape(k.difficulty), String(k.opportunityScore)].join(',')
    )
    return [header, ...rows].join('\n')
  }
  const header = 'metric,value,trend,context'
  const rows = report.metrics.map((m) => [csvEscape(m.label), csvEscape(m.value), csvEscape(m.trend), csvEscape(m.context)].join(','))
  return [header, ...rows].join('\n')
}

function toMarkdown(report: AgentReport): string {
  const lines: string[] = [`# ${report.title}`, '', `Confidence: ${Math.round(report.confidenceScore)}%`, '', '## Executive Summary', '', report.executiveSummary, '']
  if (report.metrics.length > 0) {
    lines.push('## Key Metrics', '')
    for (const m of report.metrics) lines.push(`- **${m.label}**: ${m.value} (${m.trend})${m.context ? ` — ${m.context}` : ''}`)
    lines.push('')
  }
  if (report.keywords && report.keywords.length > 0) {
    lines.push('## Keywords', '', '| Keyword | Cluster | Intent | Volume | Difficulty | Score |', '| --- | --- | --- | --- | --- | --- |')
    for (const k of report.keywords) lines.push(`| ${k.keyword} | ${k.cluster} | ${k.intent} | ${k.volumeEstimate} | ${k.difficulty} | ${k.opportunityScore} |`)
    lines.push('')
  }
  if (report.articles && report.articles.length > 0) {
    lines.push('## Recommended Articles', '')
    for (const a of report.articles) lines.push(`- **${a.title}** (score ${a.relevanceScore}) — ${a.summary}`)
    lines.push('')
  }
  if (report.insights.length > 0) {
    lines.push('## Insights', '')
    for (const ins of report.insights) lines.push(`- **${ins.title}** (impact ${ins.impactScore}, confidence ${ins.confidence}) — ${ins.description}`)
    lines.push('')
  }
  if (report.recommendations.length > 0) {
    lines.push('## Recommendations', '')
    for (const r of report.recommendations) lines.push(`- **[${r.priority.toUpperCase()}] ${r.title}** — ${r.description} (impact: ${r.impact}, difficulty: ${r.difficulty})`)
    lines.push('')
  }
  if (report.actionPlan.length > 0) {
    lines.push('## Action Plan', '')
    for (const p of report.actionPlan) {
      lines.push(`### ${p.phase}`)
      for (const a of p.actions) lines.push(`- ${a}`)
      lines.push('')
    }
  }
  if (report.citations.length > 0) {
    lines.push('## Sources', '')
    report.citations.forEach((c, i) => lines.push(`${i + 1}. ${c.source}${c.url ? ` — ${c.url}` : ''}${c.note ? ` (${c.note})` : ''}`))
  }
  return lines.join('\n')
}

export function ExportCard({ report, slug }: ExportCardProps) {
  return (
    <div className="glass-card p-6">
      <p className="section-label">Deliverables</p>
      <h3 className="mt-1 text-lg font-semibold text-white">Export this report</h3>
      <p className="mt-1 text-sm text-slate-400">Download consultant-grade deliverables generated from this analysis.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadFile(toCsv(report), `${slug}-data.csv`, 'text/csv;charset=utf-8')}
          className="btn-ghost px-4 py-2 text-xs"
        >
          <FileSpreadsheet className="h-3.5 w-3.5" /> CSV / Excel
        </button>
        <button
          type="button"
          onClick={() => downloadFile(toMarkdown(report), `${slug}-report.md`, 'text/markdown;charset=utf-8')}
          className="btn-ghost px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" /> Markdown Report
        </button>
        <button
          type="button"
          onClick={() => downloadFile(JSON.stringify(report, null, 2), `${slug}-report.json`, 'application/json;charset=utf-8')}
          className="btn-ghost px-4 py-2 text-xs"
        >
          <FileJson className="h-3.5 w-3.5" /> JSON Data
        </button>
      </div>
    </div>
  )
}
