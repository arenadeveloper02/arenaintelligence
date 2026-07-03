"use client"

import { useState } from 'react'
import type { FormEvent } from 'react'
import { KeyRound, CheckCircle2, XCircle, ShieldCheck, User, Palette, Loader2, Trash2, LogOut } from 'lucide-react'
import type { SessionUser, ApiKeyStatus } from '@/lib/types'

interface SettingsClientProps {
  user: SessionUser
  status: ApiKeyStatus
}

type Tab = 'general' | 'api-keys' | 'account'

interface Message {
  type: 'success' | 'error'
  text: string
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function SettingsClient({ user, status }: SettingsClientProps) {
  const [tab, setTab] = useState<Tab>('api-keys')
  const [keyStatus, setKeyStatus] = useState<ApiKeyStatus>(status)
  const [apiKey, setApiKey] = useState('')
  const [saving, setSaving] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!apiKey.trim() || saving) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/settings/api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })
      const data = (await res.json()) as { success: boolean; error?: string; maskedKey?: string; updatedAt?: string }
      if (!res.ok || !data.success) {
        setMessage({ type: 'error', text: data.error ?? 'Failed to save API key.' })
      } else {
        setKeyStatus({ configured: true, maskedKey: data.maskedKey ?? null, updatedAt: data.updatedAt ?? null })
        setApiKey('')
        setMessage({ type: 'success', text: 'API key verified with OpenAI and saved securely.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async () => {
    if (removing) return
    setRemoving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/settings/api-key', { method: 'DELETE' })
      const data = (await res.json()) as { success: boolean; error?: string }
      if (!res.ok || !data.success) {
        setMessage({ type: 'error', text: data.error ?? 'Failed to remove API key.' })
      } else {
        setKeyStatus({ configured: false, maskedKey: null, updatedAt: null })
        setMessage({ type: 'success', text: 'API key removed. Agents are now disabled.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setRemoving(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  const tabs: { key: Tab; label: string; icon: typeof Palette }[] = [
    { key: 'general', label: 'General', icon: Palette },
    { key: 'api-keys', label: 'API Keys', icon: KeyRound },
    { key: 'account', label: 'Account', icon: User },
  ]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Settings</h1>
        <p className="mt-1 text-slate-400">Manage your workspace, API keys and account.</p>
      </div>

      <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition ${
                tab === t.key
                  ? 'bg-gradient-to-r from-indigo-500/30 to-cyan-500/20 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'general' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Workspace</h2>
            <p className="mt-1 text-sm text-slate-400">Arena Planner AI — your AI research team for SEO &amp; content.</p>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Appearance</h2>
            <p className="mt-1 text-sm text-slate-400">Theme: Midnight (dark). The premium dark theme is always on for the best AI operating system experience.</p>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Model</h2>
            <p className="mt-1 text-sm text-slate-400">Agents run on gpt-4o-mini through your own OpenAI API key. All requests are proxied through the backend.</p>
          </div>
        </div>
      )}

      {tab === 'api-keys' && (
        <div className="space-y-4">
          <div
            className={`glass-card flex items-center gap-4 p-6 ${
              keyStatus.configured ? 'border-emerald-400/30' : 'border-amber-400/30'
            }`}
          >
            {keyStatus.configured ? (
              <CheckCircle2 className="h-8 w-8 shrink-0 text-emerald-400" />
            ) : (
              <XCircle className="h-8 w-8 shrink-0 text-amber-400" />
            )}
            <div>
              <p className={`text-lg font-semibold ${keyStatus.configured ? 'text-emerald-300' : 'text-amber-300'}`}>
                {keyStatus.configured ? 'Connected' : 'No API Key Configured'}
              </p>
              {keyStatus.configured && keyStatus.maskedKey && (
                <p className="mt-0.5 font-mono text-sm text-slate-400">{keyStatus.maskedKey}</p>
              )}
              {keyStatus.configured && keyStatus.updatedAt && (
                <p className="mt-0.5 text-xs text-slate-500">Last updated {formatDate(keyStatus.updatedAt)}</p>
              )}
              {!keyStatus.configured && (
                <p className="mt-0.5 text-sm text-slate-400">Add your OpenAI API key below to unlock all three agents.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="glass-card space-y-4 p-6">
            <h2 className="text-lg font-semibold text-white">OpenAI API Key</h2>
            <div>
              <label htmlFor="openai-key" className="mb-1.5 block text-sm font-medium text-slate-300">
                API Key
              </label>
              <input
                id="openai-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                autoComplete="off"
                className="input-field font-mono"
              />
            </div>
            {message && (
              <div
                className={`flex items-start gap-2 rounded-xl border p-3 text-sm ${
                  message.type === 'success'
                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-400/30 bg-red-500/10 text-red-300'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                {message.text}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={saving || !apiKey.trim()} className="btn-gradient">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                {saving ? 'Verifying…' : keyStatus.configured ? 'Update' : 'Save'}
              </button>
              {keyStatus.configured && (
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={removing}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-500/20"
                >
                  {removing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Remove
                </button>
              )}
            </div>
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Your API key is encrypted and stored securely. It is never exposed to the frontend.
            </p>
          </form>
        </div>
      )}

      {tab === 'account' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Account</h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-lg font-semibold text-white">
                {user.email.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{user.email}</p>
                <p className="text-xs text-slate-500">Bring Your Own Key plan — unlimited agent usage</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-white">Session</h2>
            <p className="mt-1 text-sm text-slate-400">Sign out of Arena Planner AI on this device.</p>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2.5 text-sm text-red-300 transition hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
