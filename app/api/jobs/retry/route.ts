import { NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { processJob, toAgentJobData } from '@/lib/jobs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as { id?: string }
    const id = typeof body.id === 'string' && body.id.length > 0 ? body.id : ''
    if (!id) {
      return NextResponse.json({ success: false, error: 'Job id is required.' }, { status: 400 })
    }
    const job = await prisma.agentJob.findFirst({ where: { id, userId: user.id } })
    if (!job) {
      return NextResponse.json({ success: false, error: 'Job not found.' }, { status: 404 })
    }
    if (job.status !== 'failed' && job.status !== 'cancelled') {
      return NextResponse.json(
        { success: false, error: 'Only failed or cancelled jobs can be retried.' },
        { status: 400 }
      )
    }
    const updated = await prisma.agentJob.update({
      where: { id: job.id },
      data: {
        status: 'queued',
        progress: 0,
        step: 'Queued',
        error: null,
        retryCount: 0,
        startedAt: null,
        completedAt: null,
        executionId: null,
      },
    })
    after(() => processJob(updated.id))
    return NextResponse.json({ success: true, job: toAgentJobData(updated) })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to retry the job.' }, { status: 500 })
  }
}
