"use client"

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'

const AGENTS = [
  {
    slug: 'keyword-research',
    name: 'Keyword Research',
    tagline: 'Discover high-impact keywords',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    slug: 'content-research',
    name: 'Content Research',
    tagline: 'Analyze the competitive landscape',
    gradient: 'from-sky-500 to-cyan-600',
  },
  {
    slug: 'article-recommendation',
    name: 'Article Recommendation',
    tagline: 'Get data-driven article ideas',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
]

export default function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <ParticleCanvas />
      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-lg shadow-indigo-500/30" />
            <span className="text-lg font-semibold tracking-tight">INTELLIGENCE by Position2</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get started
            </Link>
          </nav>
        </header>

        <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center md:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Premium 3D Intelligence Platform
          </div>
          <h1 className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-6xl">
            INTELLIGENCE by Position2
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Run powerful AI agents for keyword research, content analysis, and article
            recommendations — all in one immersive workspace.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 px-8 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition hover:opacity-90"
            >
              Launch INTELLIGENCE by Position2
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:bg-white/10"
            >
              View dashboard
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {AGENTS.map((agent) => (
              <div
                key={agent.slug}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20"
              >
                <div
                  className={`mb-4 h-12 w-12 rounded-xl bg-gradient-to-br ${agent.gradient} shadow-lg`}
                />
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{agent.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
