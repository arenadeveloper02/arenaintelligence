"use client"

import { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { Sparkles, Loader2, Mail, Lock } from 'lucide-react'

type Mode = 'login' | 'register'

export default function LoginClient() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError(null)
    setInfo(null)
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      })
      const data = (await res.json()) as { success: boolean; error?: string }
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setLoading(false)
      } else {
        window.location.href = '/dashboard'
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="text-xl font-semibold text-white">Arena Planner AI</span>
        </Link>
        <div className="glass-card p-8">
          <h1 className="text-center text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-center text-sm text-slate-400">
            {mode === 'login' ? 'Sign in to your AI research team.' : 'Start using your AI research team in minutes.'}
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 accent-indigo-500"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setInfo('Password reset is not available in this MVP. Please create a new account.')}
                className="text-indigo-300 transition hover:text-indigo-200"
              >
                Forgot password?
              </button>
            </div>
            {error && (
              <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>
            )}
            {info && (
              <p className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300">{info}</p>
            )}
            <button type="submit" disabled={loading} className="btn-gradient w-full py-3">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setError(null)
                setInfo(null)
              }}
              className="font-medium text-indigo-300 transition hover:text-indigo-200"
            >
              {mode === 'login' ? 'Create Account' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
