"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { PremiumInput } from '@/components/PremiumInput'
import { GradientButton } from '@/components/GradientButton'
import { LogoMark } from '@/components/LogoMark'

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-midnight px-4 text-white">
      <AnimatedBackground />
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <LogoMark size={40} priority className="h-10 w-10 shrink-0 rounded-2xl shadow-lg shadow-primary/40" />
          <span className="text-lg font-semibold tracking-tight">
            INTELLIGENCE <span className="font-normal text-slate-400">by Position2</span>
          </span>
        </Link>
        <div className="glass-card p-8 md:p-10">
          <p className="section-label">{mode === 'login' ? 'Sign in' : 'Sign up'}</p>
          <h1 className="gradient-text mt-2 text-3xl font-semibold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === 'login'
              ? 'Sign in to access INTELLIGENCE by Position2.'
              : 'Sign up to start using INTELLIGENCE by Position2.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <PremiumInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              required
            />
            <PremiumInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
              minLength={6}
            />
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900 accent-indigo-500"
              />
              Remember me
            </label>

            {error && (
              <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </div>
            )}

            <GradientButton type="submit" disabled={loading} className="w-full py-3">
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
            </GradientButton>
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
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
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
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
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
      </motion.div>
    </div>
  )
}
