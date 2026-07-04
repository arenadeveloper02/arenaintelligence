"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function JobsIndicator() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch('/api/jobs', { cache: 'no-store' })
        if (!res.ok) return
        const data = (await res.json()) as { runningCount: number }
        if (active) setCount(data.runningCount)
      } catch {
        // the next poll retries
      }
    }
    void load()
    const interval = window.setInterval(() => {
      void load()
    }, 8000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

  if (count === 0) return null

  return (
    <Link
      href="/dashboard"
      title="View running background jobs"
      className="flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
    >
      <Loader2 className="h-3.5 w-3.5 animate-spin" />
      {count} running
    </Link>
  )
}
