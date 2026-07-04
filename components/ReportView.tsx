"use client"

import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Lightbulb, ListChecks, Link2, Newspaper, CalendarClock, Table2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { InsightCard } from '@/components/InsightCard'
import { RecommendationCard } from '@/components/RecommendationCard'
import { TimelineComponent } from '@/components/TimelineComponent'
import { CitationCard } from '@/components/CitationCard'
import { ExportCard } from '@/components/ExportCard'
import type { AgentReport } from '@/lib/types'

interface ReportViewProps {
  report: AgentReport
  slug: string
}

function SectionHeading({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-4 w-4 text-indigo-300" />
      <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</h3>
    </div>
  )
}

export default function ReportView({ report, slug }: ReportViewProps) {
  const dist = report.intentDistribution ?? []
  const maxDist = dist.reduce((m, d) => Math.max(m, d.value), 0)
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="cta-panel px-6 py-6 md:px-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-label flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> Executive Summary
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">{report.title}</h2>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Confidence {Math.round(Math.min(Math.max(report.confidenceScore, 0), 100))}%
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{report.executiveSummary}</p>
      </motion.div>

      {report.metrics.length > 0 && (
        <section>
          <SectionHeading icon={BarChart3} label="Metrics Dashboard" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {report.metrics.map((m, i) => (
              <MetricCard key={`${m.label}-${i}`} metric={m} delay={i * 0.06} />
            ))}
          </div>
        </section>
      )}

      {dist.length > 0 && (
        <section>
          <SectionHeading icon={BarChart3} label="Intent Distribution" />
          <div className="glass-card space-y-3 p-6">
            {dist.map((d, i) => (
              <div key={`${d.label}-${i}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="capitalize text-slate-300">{d.label}</span>
                  <span className="text-slate-500">{d.value}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                    style={{ width: `${maxDist > 0 ? Math.max((d.value / maxDist) * 100, 4) : 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {report.keywords && report.keywords.length > 0 && (
        <section>
          <SectionHeading icon={Table2} label="Keyword Opportunity Matrix" />
          <div className="glass-card overflow-x-auto !p-0">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-medium">Keyword</th>
                  <th className="px-5 py-3 font-medium">Cluster</th>
                  <th className="px-5 py-3 font-medium">Intent</th>
                  <th className="px-5 py-3 font-medium">Volume</th>
                  <th className="px-5 py-3 font-medium">Difficulty</th>
                  <th className="px-5 py-3 font-medium">Opportunity</th>
                </tr>
              </thead>
              <tbody>
                {report.keywords.map((k, i) => (
                  <tr key={`${k.keyword}-${i}`} className="border-b border-white/[0.04] transition hover:bg-white/[0.03]">
                    <td className="px-5 py-3 text-white">{k.keyword}</td>
                    <td className="px-5 py-3 text-slate-400">{k.cluster}</td>
                    <td className="px-5 py-3">
                      <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs capitalize text-indigo-300">
                        {k.intent}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400">{k.volumeEstimate}</td>
                    <td className="px-5 py-3 capitalize text-slate-400">{k.difficulty}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.08]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                            style={{ width: `${Math.min(Math.max(k.opportunityScore, 0), 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-300">{Math.round(k.opportunityScore)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {report.articles && report.articles.length > 0 && (
        <section>
          <SectionHeading icon={Newspaper} label="Recommended Articles" />
          <div className="grid gap-4 md:grid-cols-2">
            {report.articles.map((a, i) => (
              <div key={`${a.title}-${i}`} className="glass-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">{a.title}</h4>
                  <span className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs text-cyan-300">
                    {Math.round(a.relevanceScore)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{a.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] capitalize text-indigo-300">
                    {a.intent}
                  </span>
                  {a.tags.map((t, j) => (
                    <span key={`${t}-${j}`} className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {report.insights.length > 0 && (
        <section>
          <SectionHeading icon={Lightbulb} label="Key Insights" />
          <div className="grid gap-4 md:grid-cols-2">
            {report.insights.map((ins, i) => (
              <InsightCard key={`${ins.title}-${i}`} insight={ins} delay={i * 0.06} />
            ))}
          </div>
        </section>
      )}

      {report.recommendations.length > 0 && (
        <section>
          <SectionHeading icon={ListChecks} label="Recommendations" />
          <div className="grid gap-4 md:grid-cols-2">
            {report.recommendations.map((r, i) => (
              <RecommendationCard key={`${r.title}-${i}`} recommendation={r} delay={i * 0.06} />
            ))}
          </div>
        </section>
      )}

      {report.actionPlan.length > 0 && (
        <section>
          <SectionHeading icon={CalendarClock} label="Action Plan" />
          <TimelineComponent phases={report.actionPlan} />
        </section>
      )}

      {report.citations.length > 0 && (
        <section>
          <SectionHeading icon={Link2} label="Sources & Citations" />
          <div className="grid gap-3 md:grid-cols-2">
            {report.citations.map((c, i) => (
              <CitationCard key={`${c.source}-${i}`} citation={c} index={i} />
            ))}
          </div>
        </section>
      )}

      <ExportCard report={report} slug={slug} />
    </div>
  )
}
