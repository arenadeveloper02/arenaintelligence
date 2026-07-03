"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'

export default function LoginClient() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Something went wrong')
        setLoading(false)
        return
      }
      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
      <ParticleCanvas />
      <div className="relative z-10 w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 shadow-lg shadow-indigo-500/30" />
          <span className="text-lg font-semibold tracking-tight">INTELLIGENCE by Position2</span>
        </Link>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-2xl font-bold">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === 'login'
              ? 'Sign in to access INTELLIGENCE by Position2.'
              : 'Sign up to start using INTELLIGENCE by Position2.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-white outline-none transition focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Remember me
            </label>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register')
                    setError('')
                  }}
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login')
                    setError('')
                  }}
                  className="font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} INTELLIGENCE by Position2
        </p>
      </div>
    </div>
  )
}
