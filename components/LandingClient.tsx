"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, KeyRound, FileSearch, Lightbulb, Zap, ShieldCheck, BarChart3, Workflow, CheckCircle2, Bot } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { LogoMark } from '@/components/LogoMark'

interface AgentCard {
  slug: string
  name: string
  tagline: string
  gradient: string
  icon: LucideIcon
  points: string[]
}

const AGENTS: AgentCard[] = [
  {
    slug: 'keyword-research',
    name: 'Keyword Research',
    tagline: 'Discover high-impact keywords, clusters and opportunity scores in seconds.',
    gradient: 'from-indigo-500 to-cyan-400',
    icon: KeyRound,
    points: ['Keyword clusters', 'Search intent classification', 'Opportunity scoring'],
  },
  {
    slug: 'content-research',
    name: 'Content Research',
    tagline: 'Analyze the competitive landscape and uncover content gaps that matter.',
    gradient: 'from-cyan-500 to-blue-500',
    icon: FileSearch,
    points: ['Content gap analysis', 'Questions users ask', 'Complete article outlines'],
  },
  {
    slug: 'article-recommendation',
    name: 'Article Recommendation',
    tagline: 'Get data-driven article ideas, titles and a full publishing plan.',
    gradient: 'from-purple-500 to-fuchsia-500',
    icon: Lightbulb,
    points: ['Scored article ideas', 'Trending topics', '4-week content calendar'],
  },
]

const STATS = [
  { value: '3', label: 'Specialized AI agents' },
  { value: '100+', label: 'Insights per execution' },
  { value: '<60s', label: 'Average run time' },
  { value: '24/7', label: 'Always-on workspace' },
]

interface Capability {
  icon: LucideIcon
  title: string
  text: string
}

const CAPABILITIES: Capability[] = [
  {
    icon: Zap,
    title: 'Instant execution',
    text: 'Fire an agent and watch structured intelligence stream back in under a minute — no setup, no pipelines.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-grade security',
    text: 'Your API keys are encrypted with AES-256-GCM and sessions are protected with secure httpOnly cookies.',
  },
  {
    icon: BarChart3,
    title: 'Actionable reports',
    text: 'Every run produces downloadable, well-structured reports — CSV keyword tables and markdown briefs.',
  },
  {
    icon: Workflow,
    title: 'Unified workflow',
    text: 'Research, plan and prioritize from a single immersive workspace with full execution history.',
  },
]

interface Step {
  num: string
  title: string
  text: string
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Connect your key',
    text: 'Create your workspace and securely connect your OpenAI API key — encrypted before it ever touches the database.',
  },
  {
    num: '02',
    title: 'Run an agent',
    text: 'Choose Keyword Research, Content Research or Article Recommendation and provide a few structured inputs.',
  },
  {
    num: '03',
    title: 'Ship the plan',
    text: 'Download CSV keyword tables and markdown briefs, then revisit any execution from your full history.',
  },
]

const PREVIEW_NAV = ['Dashboard', 'Keyword Research', 'Content Research', 'Article Recommendation', 'History', 'Settings']

export default function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <AnimatedBackground />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-midnight/60 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
            <div className="flex items-center gap-3">
              <LogoMark size={36} priority className="h-9 w-9 shrink-0 rounded-xl shadow-lg shadow-primary/40" />
              <span className="text-base font-semibold tracking-tight md:text-lg">
                INTELLIGENCE <span className="hidden font-normal text-slate-400 sm:inline">by Position2</span>
              </span>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#agents" className="nav-link">Agents</a>
              <a href="#platform" className="nav-link">Platform</a>
              <a href="#workflow" className="nav-link">How it works</a>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Sign in
              </Link>
              <Link href="/login" className="btn-gradient px-5 py-2.5 text-sm">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="badge-pill mb-8"
          >
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Premium AI Intelligence Platform
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.08] tracking-[-0.025em] md:text-6xl lg:text-7xl"
          >
            Intelligence that powers
            <br />
            <span className="gradient-text">every content decision</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Run powerful AI agents for keyword research, content analysis and article
            recommendations — all in one immersive workspace built for modern marketing teams.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/login" className="btn-gradient px-8 py-3.5">
              Launch the platform <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="btn-ghost px-8 py-3.5">
              View dashboard
            </Link>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="preview-panel p-2 md:p-3"
          >
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-indigo-500/20 to-transparent blur-2xl" />
            <div className="relative grid gap-3 rounded-[20px] border border-white/[0.06] bg-[#070B18]/80 p-4 md:grid-cols-[220px_1fr] md:p-5">
              <div className="hidden flex-col gap-1 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 md:flex">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <LogoMark size={24} className="h-6 w-6 shrink-0 rounded-lg" />
                  <span className="text-[11px] font-semibold text-slate-300">INTELLIGENCE</span>
                </div>
                {PREVIEW_NAV.map((label, i) => (
                  <div
                    key={label}
                    className={`rounded-xl px-3 py-2 text-[11px] ${
                      i === 0
                        ? 'bg-gradient-to-r from-primary/25 to-secondary/20 text-white ring-1 ring-inset ring-indigo-400/20'
                        : 'text-slate-500'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Total executions', value: '128' },
                    { label: 'API key', value: 'Configured' },
                    { label: 'Active agents', value: '3' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                      <p className="text-[11px] text-slate-500">{stat.label}</p>
                      <p className="mt-1.5 text-xl font-semibold tracking-tight text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Recent executions</p>
                    <Bot className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="mt-3 space-y-2">
                    {[92, 74, 58].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-400/70" />
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500/60 to-cyan-400/50"
                            style={{ width: `${w}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card grid grid-cols-2 divide-white/[0.06] p-2 md:grid-cols-4 md:divide-x"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="gradient-text text-3xl font-bold tracking-tight md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs text-slate-400 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="agents" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
          <div className="mb-12 text-center">
            <p className="section-label">AI Agents</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Three agents. One intelligence layer.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Each agent is purpose-built for a stage of your content workflow — from discovery to
              planning to publishing.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {AGENTS.map((agent, i) => {
              const Icon = agent.icon
              return (
                <motion.div
                  key={agent.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card relative overflow-hidden p-7"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{agent.tagline}</p>
                  <ul className="mt-5 space-y-2">
                    {agent.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                  >
                    Run this agent <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section id="platform" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
          <div className="mb-12 text-center">
            <p className="section-label">Platform</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built for teams that move fast
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Everything you need to turn raw AI output into consultant-grade deliverables.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="glass-card p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20">
                    <Icon className="h-5 w-5 text-indigo-300" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{cap.text}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section id="workflow" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24">
          <div className="mb-12 text-center">
            <p className="section-label">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              From seed keyword to shipped plan
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card p-7"
              >
                <span className="gradient-text text-3xl font-bold">{step.num}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-panel px-8 py-12 text-center md:px-16 md:py-16"
          >
            <p className="section-label">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Ready to power your next content decision?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Create your workspace, connect your OpenAI key and run your first agent in under two minutes.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login" className="btn-gradient px-8 py-3.5">
                Create free workspace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-ghost px-8 py-3.5">
                Sign in
              </Link>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-white/[0.06]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row md:px-12">
            <div className="flex items-center gap-3">
              <LogoMark size={28} className="h-7 w-7 shrink-0 rounded-lg" />
              <span className="text-sm font-semibold text-slate-300">
                INTELLIGENCE <span className="font-normal text-slate-500">by Position2</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#agents" className="footer-link">Agents</a>
              <a href="#platform" className="footer-link">Platform</a>
              <a href="#workflow" className="footer-link">How it works</a>
              <Link href="/login" className="footer-link">Sign in</Link>
            </div>
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} INTELLIGENCE by Position2</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
