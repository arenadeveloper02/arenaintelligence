"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { FloatingPanel } from '@/components/FloatingPanel'

const AGENTS = [
  {
    slug: 'keyword-research',
    name: 'Keyword Research',
    tagline: 'Discover high-impact keywords, clusters and opportunity scores',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    slug: 'content-research',
    name: 'Content Research',
    tagline: 'Analyze the competitive landscape and uncover content gaps',
    gradient: 'from-sky-500 to-cyan-600',
  },
  {
    slug: 'article-recommendation',
    name: 'Article Recommendation',
    tagline: 'Get data-driven article ideas and publishing plans',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
]

export default function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="flex h-[72px] items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40">
              <span className="text-sm font-bold text-white">I</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">INTELLIGENCE by Position2</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Sign in
            </Link>
            <Link href="/login" className="btn-gradient">
              Get started
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 text-center md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-sm text-slate-300 backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Premium AI Intelligence Platform
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="gradient-text text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            INTELLIGENCE by Position2
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-400"
          >
            Run powerful AI agents for keyword research, content analysis, and article
            recommendations — all in one immersive workspace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/login" className="btn-gradient px-8 py-3">
              Launch INTELLIGENCE by Position2 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="btn-ghost px-8 py-3">
              View dashboard
            </Link>
          </motion.div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {AGENTS.map((agent, i) => (
              <FloatingPanel key={agent.slug} delay={i * 0.12} className="p-6">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient} shadow-lg`}>
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                </div>
                <h3 className="text-lg font-medium text-white">{agent.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{agent.tagline}</p>
              </FloatingPanel>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/[0.06] px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
