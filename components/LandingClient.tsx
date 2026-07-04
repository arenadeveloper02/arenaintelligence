"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, KeyRound, FileSearch, Lightbulb, Zap, ShieldCheck, BarChart3, Workflow, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatedBackground } from '@/components/AnimatedBackground'

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

export default function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <AnimatedBackground />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10">
        <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-midnight/60 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-12">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40">
                <span className="text-sm font-bold text-white">I</span>
              </div>
              <span className="text-base font-semibold tracking-tight md:text-lg">
                INTELLIGENCE <span className="hidden font-normal text-slate-400 sm:inline">by Position2</span>
              </span>
            </div>
            <nav className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Sign in
              </Link>
              <Link href="/login" className="btn-gradient px-5 py-2.5 text-sm">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center md:pt-36">
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
            className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
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

        <section className="mx-auto max-w-6xl px-6 pb-24">
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
                  transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(99, 102, 241, 0.22)' }}
                  className="glass-card group relative overflow-hidden p-7"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                  </div>
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{agent.tagline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {agent.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition group-hover:text-indigo-300"
                  >
                    Run this agent <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-12 text-center">
            <p className="section-label">Platform</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Built for serious content teams
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20">
                    <Icon className="h-5 w-5 text-indigo-300" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{cap.text}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="cta-panel px-8 py-14 text-center md:px-16 md:py-20"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
            <h2 className="relative text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to unlock your content intelligence?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">
              Create your workspace, connect your OpenAI API key and run your first agent in under a
              minute.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login" className="btn-gradient px-8 py-3.5">
                Get started free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-ghost px-8 py-3.5">
                Sign in
              </Link>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-white/[0.06] bg-midnight/40 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40">
                  <span className="text-xs font-bold text-white">I</span>
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  INTELLIGENCE <span className="font-normal text-slate-400">by Position2</span>
                </span>
              </div>
              <nav className="flex items-center gap-6 text-sm text-slate-400">
                <Link href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
                <Link href="/history" className="transition hover:text-white">
                  History
                </Link>
                <Link href="/settings" className="transition hover:text-white">
                  Settings
                </Link>
              </nav>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
