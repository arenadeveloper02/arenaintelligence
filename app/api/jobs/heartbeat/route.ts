import { NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { processJob, recoverStaleJobs } from '@/lib/jobs'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Keep the serverless invocation alive long enough for the after() background
// executor to finish re-dispatched long-running agent calls, independent of
// the browser tab or the page the user is currently on.
export const maxDuration = 60

/**
 * Global background-job heartbeat. Polled from every page (via JobsKeepAlive
 * in the root layout) so that stale queued/running jobs are recovered and
 * re-executed no matter which route the user is on — Home, Settings, or a
 * completely different agent page. Agent execution therefore never depends
 * on the page that started it.
 */
export async function GET(): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ runningCount: 0, recovered: 0 }, { status: 401 })
  }
  try {
    const staleIds = await recoverStaleJobs(user.id)
    if (staleIds.length > 0) {
      after(async () => {
        for (const jobId of staleIds) {
          await processJob(jobId)
        }
      })
    }
    const runningCount = await prisma.agentJob.count({
      where: { userId: user.id, status: { in: ['queued', 'running'] } },
    })
    return NextResponse.json({ runningCount, recovered: staleIds.length })
  } catch {
    return NextResponse.json({ runningCount: 0, recovered: 0 }, { status: 500 })
  }
}
