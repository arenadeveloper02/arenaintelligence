"use client"

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'

const AGENTS = [
  {
    slug: 'keyword-research',
    name: 'Keyword Research',
    tagline: 'Discover high-intent keywords',
    gradient: 'from-fuchsia-500 to-purple-600',
  },
  {
    slug: 'content-research',
    name: 'Content Research',
    tagline: 'Analyze topics and gaps',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    slug: 'article-recommendation',
    name: 'Article Recommendation',
    tagline: 'Get tailored content ideas',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

export default function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050510] text-white">
      <ParticleCanvas />
      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
            <span className="text-lg font-semibold tracking-tight">INTELLIGENCE by Position2</span>
          </div>
          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium transition hover:border-white/50 hover:bg-white/5"
          >
            Sign in
          </Link>
        </header>

        <section className="mx-auto max-w-5xl px-6 pt-20 text-center md:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            AI-powered intelligence platform
          </div>
          <h1 className="bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
            INTELLIGENCE by Position2
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
            Run specialized AI agents for keyword research, content research, and article
            recommendations — all in one premium workspace.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-8 py-3 text-sm font-semibold shadow-lg shadow-fuchsia-500/25 transition hover:opacity-90"
            >
              Get started
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold transition hover:border-white/50 hover:bg-white/5"
            >
              View dashboard
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-24 grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-3">
          {AGENTS.map((agent) => (
            <div
              key={agent.slug}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:border-white/20"
            >
              <div
                className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${agent.gradient}`}
              />
              <h3 className="text-lg font-semibold">{agent.name}</h3>
              <p className="mt-2 text-sm text-white/50">{agent.tagline}</p>
            </div>
          ))}
        </section>

        <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40 md:px-12">
          © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
