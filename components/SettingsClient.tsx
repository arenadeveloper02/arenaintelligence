"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
      const data = await res.json()
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
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage your INTELLIGENCE by Position2 account and integrations.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Account</h2>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3">
          <span className="text-sm text-slate-400">Email</span>
          <span className="text-sm">{user.email}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">OpenAI API Key</h2>
        <p className="mt-1 text-sm text-slate-400">
          Your API key is encrypted and stored securely. It powers all INTELLIGENCE by Position2
          agents.
        </p>

        {status.configured && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <span className="text-sm text-emerald-200">
              Current key: {status.maskedKey}
            </span>
            {status.updatedAt && (
              <span className="text-xs text-emerald-300/70">
                Updated {new Date(status.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            placeholder="sk-..."
            className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
          />
          {message && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving…' : status.configured ? 'Update key' : 'Save key'}
          </button>
        </form>
      </div>
    </div>
  )
}
