"use client"

import { useEffect } from 'react'

/**
 * Mounted once in the root layout so it is present on EVERY route (landing,
 * login, dashboard, agents, settings…). It periodically pings the server-side
 * job heartbeat, which recovers and re-dispatches any queued/running agent
 * jobs whose executor was interrupted. This fully decouples agent execution
 * from component state, the current route, refreshes and tab lifecycle —
 * jobs keep running until completion or failure no matter where the user
 * navigates.
 */
export default function JobsKeepAlive() {
  useEffect(() => {
    let active = true

    const ping = async () => {
      try {
        await fetch('/api/jobs/heartbeat', { cache: 'no-store' })
      } catch {
        // best-effort; the next tick retries
      }
    }

    void ping()
    const interval = window.setInterval(() => {
      if (active) void ping()
    }, 12000)

    const onVisible = () => {
      if (document.visibilityState === 'visible' && active) void ping()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      active = false
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return null
}
