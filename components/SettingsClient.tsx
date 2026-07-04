"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, KeyRound, ShieldCheck } from 'lucide-react'
import { GlassCard } from '@/components/GlassCard'
import { PremiumInput } from '@/components/PremiumInput'
import { GradientButton } from '@/components/GradientButton'
import type { ApiKeyStatus, SessionUser } from '@/lib/types'

interface SettingsClientProps {
  user: SessionUser
  status: ApiKeyStatus
}

export function SettingsClient({ user, status }: SettingsClientProps) {
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setError(null)
    setSaving(true)
    try {
      const res = await fetch('/api/settings/api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Failed to save API key')
        setSaving(false)
        return
      }
      setMessage('API key saved successfully to INTELLIGENCE by Position2.')
      setApiKey('')
      setSaving(false)
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your INTELLIGENCE by Position2 account and integrations.
        </p>
      </motion.div>

      <GlassCard hover={false} delay={0.08} className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/20">
            <User className="h-5 w-5 text-indigo-300" />
          </span>
          <h2 className="text-lg font-medium text-white">Account</h2>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/20 px-4 py-3">
          <span className="text-sm text-slate-400">Email</span>
          <span className="text-sm text-white">{user.email}</span>
        </div>
      </GlassCard>

      <GlassCard hover={false} delay={0.16} className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20">
            <KeyRound className="h-5 w-5 text-emerald-300" />
          </span>
          <h2 className="text-lg font-medium text-white">OpenAI API Key</h2>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Your API key is encrypted and stored securely. It powers all INTELLIGENCE by Position2 agents.
        </p>

        {status.configured && (
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-success/30 bg-success/10 px-4 py-3">
            <span className="text-sm text-emerald-200">Current key: {status.maskedKey}</span>
            {status.updatedAt && (
              <span className="text-xs text-emerald-300/70">
                Updated {new Date(status.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <PremiumInput
            id="apiKey"
            label="API Key"
            type="password"
            value={apiKey}
            onChange={setApiKey}
            required
            placeholder="sk-..."
          />
          {message && (
            <div className="rounded-2xl border border-success/30 bg-success/10 px-4 py-2.5 text-sm text-emerald-300">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-sm text-red-300">
              {error}
            </div>
          )}
          <GradientButton type="submit" disabled={saving}>
            {saving ? 'Saving…' : status.configured ? 'Update key' : 'Save key'}
          </GradientButton>
        </form>

        <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-success" />
          Your key is encrypted with AES-256-GCM before it is stored.
        </p>
      </GlassCard>
    </div>
  )
}
