import Link from 'next/link'
import { Sparkles, KeyRound, Bot, Zap, ArrowRight, Check, Target, BookOpen, Lightbulb } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AGENT_LIST } from '@/lib/agents'
import type { AgentSlug } from '@/lib/types'

const AGENT_ICONS: Record<AgentSlug, LucideIcon> = {
  'keyword-research': Target,
  'content-research': BookOpen,
  'article-recommendation': Lightbulb,
}

const STEPS = [
  { icon: KeyRound, title: 'Connect your OpenAI API key', description: 'Add your key once in Settings. It is encrypted and stored securely — never exposed to the browser.' },
  { icon: Bot, title: 'Choose an AI agent', description: 'Pick Keyword Research, Content Research, or Article Recommendation and fill in a few inputs.' },
  { icon: Zap, title: 'Receive insights instantly', description: 'Get structured research, scores and recommendations you can export and act on immediately.' },
]

export default function LandingClient() {
  return (
    <div className="grid-bg min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="text-lg font-semibold text-white">Arena Planner AI</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost">Login</Link>
          <Link href="/login" className="btn-gradient">Get Started</Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" /> Powered entirely by your own OpenAI key
        </div>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
          Your AI Research Team for <span className="gradient-text">SEO &amp; Content</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Keyword research, content research, and article recommendations powered entirely by your OpenAI API key.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/login" className="btn-gradient px-8 py-3 text-base">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/login" className="btn-ghost px-8 py-3 text-base">Login</Link>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-center text-3xl font-bold text-white">Three specialized agents. One platform.</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
          Every agent is tuned for a specific research workflow and delivers structured, exportable output.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {AGENT_LIST.map((agent) => {
            const Icon = AGENT_ICONS[agent.slug]
            return (
              <div key={agent.slug} className="glass-card glass-card-hover p-8">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${agent.gradient}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{agent.name}</h3>
                <p className="mt-1 text-sm font-medium text-indigo-300">{agent.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{agent.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-center text-3xl font-bold text-white">How it works</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="glass-card glass-card-hover p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10">
                  <Icon className="h-6 w-6 text-indigo-300" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-cyan-300">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{step.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <h2 className="text-center text-3xl font-bold text-white">Simple pricing</h2>
        <div className="glass-card mt-12 border-indigo-400/30 p-10 text-center">
          <h3 className="text-2xl font-bold text-white">Arena Planner AI</h3>
          <p className="mt-2 text-lg text-indigo-300">Bring Your Own OpenAI Key</p>
          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {['Unlimited agent usage', 'Secure API key storage', 'No additional platform charges'].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400">
                  <Check className="h-3.5 w-3.5 text-white" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Link href="/login" className="btn-gradient mt-10 px-8 py-3 text-base">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Arena Planner AI. All rights reserved.</p>
          <nav className="flex items-center gap-6 text-sm text-slate-400">
            <Link href="/login" className="transition hover:text-white">Login</Link>
            <Link href="/#features" className="transition hover:text-white">Privacy</Link>
            <Link href="/#features" className="transition hover:text-white">Terms</Link>
            <Link href="/#features" className="transition hover:text-white">Documentation</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
