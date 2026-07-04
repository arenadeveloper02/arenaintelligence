import { NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { AGENTS } from '@/lib/agents'
import { processJob, toAgentJobData } from '@/lib/jobs'
import type { AgentSlug } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ jobs: [], runningCount: 0 }, { status: 401 })
  }
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (id) {
      const job = await prisma.agentJob.findFirst({ where: { id, userId: user.id } })
      if (!job) {
        return NextResponse.json({ error: 'Job not found.' }, { status: 404 })
      }
      let output: string | null = null
      if (job.status === 'completed' && job.executionId) {
        const execution = await prisma.execution.findUnique({ where: { id: job.executionId } })
        output = execution ? execution.output : null
      }
      return NextResponse.json({ job: toAgentJobData(job), output })
    }
    const agent = url.searchParams.get('agent')
    const jobs = await prisma.agentJob.findMany({
      where: { userId: user.id, ...(agent ? { agentName: agent } : {}) },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })
    const runningCount = await prisma.agentJob.count({
      where: { userId: user.id, status: { in: ['queued', 'running'] } },
    })
    return NextResponse.json({ jobs: jobs.map(toAgentJobData), runningCount })
  } catch {
    return NextResponse.json({ jobs: [], runningCount: 0 }, { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as { agent?: string; inputs?: Record<string, string> }
    const agent = body.agent
    const inputs = body.inputs ?? {}
    if (!agent || !(agent in AGENTS)) {
      return NextResponse.json({ success: false, error: 'Unknown agent.' }, { status: 400 })
    }
    const slug = agent as AgentSlug
    const config = AGENTS[slug]
    for (const field of config.fields) {
      if (field.required && !(inputs[field.name] ?? '').trim()) {
        return NextResponse.json({ success: false, error: `${field.label} is required.` }, { status: 400 })
      }
    }
    const setting = await prisma.setting.findUnique({ where: { userId: user.id } })
    if (!setting?.openaiApiKey) {
      return NextResponse.json(
        { success: false, error: 'Connect your OpenAI API key to start using AI agents.' },
        { status: 400 }
      )
    }
    const job = await prisma.agentJob.create({
      data: {
        userId: user.id,
        agentName: slug,
        input: JSON.stringify(inputs),
        status: 'queued',
        progress: 0,
        step: 'Queued',
      },
    })
    try {
      await prisma.notification.create({
        data: {
          userId: user.id,
          type: 'info',
          category: 'Agent Execution',
          title: `${config.name} started`,
          message: `${config.name} is running in the background. You can navigate away — we will notify you when it completes.`,
          agentSlug: slug,
        },
      })
    } catch {
      // start notification is best-effort
    }
    after(() => processJob(job.id))
    return NextResponse.json({ success: true, job: toAgentJobData(job) })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to start the agent job.' }, { status: 500 })
  }
}
