"use client"

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'

export function LandingClient() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <ParticleCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold">
            IP
          </div>
          <span className="text-lg font-semibold">INTELLIGENCE by Position2</span>
        </div>
        <Link
          href="/login"
          className="rounded-lg border border-white/15 px-4 py-2 text-sm transition hover:bg-white/10"
        >
          Sign in
        </Link>
      </header>

      <section className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center lg:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Premium AI Intelligence Platform
        </div>
        <h1 className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl">
          INTELLIGENCE by Position2
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Orchestrate powerful AI agents for keyword research, content research, and article
          recommendations — all in one premium, intelligent workspace.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold shadow-lg shadow-indigo-500/25 transition hover:opacity-90"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-white/15 px-8 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            View dashboard
          </Link>
        </div>

        <div className="mt-20 grid w-full gap-6 sm:grid-cols-3">
          {[
            { title: 'Keyword Research', desc: 'Discover high-value keywords with AI precision.' },
            { title: 'Content Research', desc: 'Deep-dive research to power your content.' },
            { title: 'Article Recommendation', desc: 'Smart recommendations tailored to your goals.' },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md"
            >
              <div className="mb-3 h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-6 text-center text-xs text-slate-500 lg:px-12">
        © {new Date().getFullYear()} INTELLIGENCE by Position2. All rights reserved.
      </footer>
    </div>
  )
}
