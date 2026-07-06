import { prisma } from '@/lib/prisma'
import { decryptApiKey } from '@/lib/auth'
import { AGENTS, buildPrompt, parseAgentReport, SYSTEM_PROMPT } from '@/lib/agents'
import type { AgentJobData, AgentSlug, JobStatus } from '@/lib/types'

const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 2000

// A queued job that has not been picked up within this window is considered
// stale (the serverless invocation that scheduled it was terminated) and is
// re-dispatched on the next poll of GET /api/jobs or GET /api/notifications.
// Kept short so interrupted jobs resume quickly after navigation/refresh.
const QUEUED_STALE_MS = 10_000

// A running job whose row has not been touched (no progress heartbeat) within
// this window is considered orphaned and is re-queued for recovery.
const RUNNING_STALE_MS = 90_000

interface AgentJobRow {
  id: string
  agentName: string
  input: string
  status: string
  progress: number
  step: string | null
  error: string | null
  executionId: string | null
  retryCount: number
  createdAt: Date
  startedAt: Date | null
  completedAt: Date | null
}

function toStatus(s: string): JobStatus {
  return s === 'running' || s === 'completed' || s === 'failed' || s === 'cancelled' ? s : 'queued'
}

export function toAgentJobData(j: AgentJobRow): AgentJobData {
  return {
    id: j.id,
    agentName: j.agentName,
    input: j.input,
    status: toStatus(j.status),
    progress: j.progress,
    step: j.step,
    error: j.error,
    executionId: j.executionId,
    retryCount: j.retryCount,
    createdAt: j.createdAt.toISOString(),
    startedAt: j.startedAt ? j.startedAt.toISOString() : null,
    completedAt: j.completedAt ? j.completedAt.toISOString() : null,
  }
}

/**
 * Recover jobs whose executor was interrupted (e.g. serverless invocation
 * terminated, deployment restarted). Stale queued jobs are re-dispatched and
 * orphaned running jobs are re-queued. Returns the ids that should be handed
 * back to processJob(). This makes execution independent of any single
 * request, browser tab or page lifecycle.
 */
export async function recoverStaleJobs(userId: string): Promise<string[]> {
  const toProcess: string[] = []
  try {
    const now = Date.now()
    const active = await prisma.agentJob.findMany({
      where: { userId, status: { in: ['queued', 'running'] } },
      select: { id: true, status: true, createdAt: true, updatedAt: true },
    })
    for (const job of active) {
      const idleMs = now - job.updatedAt.getTime()
      if (job.status === 'queued' && idleMs > QUEUED_STALE_MS) {
        // Touch the row so concurrent polls do not double-dispatch, then re-kick.
        await prisma.agentJob.update({
          where: { id: job.id },
          data: { step: 'Queued', progress: 0 },
        })
        toProcess.push(job.id)
      } else if (job.status === 'running' && idleMs > RUNNING_STALE_MS) {
        await prisma.agentJob.update({
          where: { id: job.id },
          data: { status: 'queued', step: 'Recovering interrupted job', progress: 0, error: null },
        })
        toProcess.push(job.id)
      }
    }
  } catch {
    // recovery is best-effort and must never break polling
  }
  return toProcess
}

async function createJobNotification(
  userId: string,
  type: 'success' | 'info' | 'warning' | 'error',
  title: string,
  message: string,
  agentSlug?: string,
  executionId?: string
): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        userId,
        type,
        category: 'Agent Execution',
        title,
        message,
        agentSlug: agentSlug ?? null,
        executionId: executionId ?? null,
      },
    })
  } catch {
    // notification failures must never break job processing
  }
}

async function jobCancelled(jobId: string): Promise<boolean> {
  const job = await prisma.agentJob.findUnique({ where: { id: jobId }, select: { status: true } })
  return !job || job.status === 'cancelled'
}

async function setProgress(jobId: string, progress: number, step: string): Promise<void> {
  // updateMany also refreshes updatedAt, acting as a liveness heartbeat for recovery.
  await prisma.agentJob.updateMany({
    where: { id: jobId, status: 'running' },
    data: { progress, step },
  })
}

async function failJob(jobId: string, userId: string, slug: string, name: string, message: string): Promise<void> {
  await prisma.agentJob.update({
    where: { id: jobId },
    data: { status: 'failed', error: message, step: 'Failed', completedAt: new Date() },
  })
  await createJobNotification(userId, 'error', `${name} failed`, `${message} Click to retry.`, slug)
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function processJob(jobId: string): Promise<void> {
  try {
    const job = await prisma.agentJob.findUnique({ where: { id: jobId } })
    if (!job) return
    if (job.status !== 'queued' && job.status !== 'running') return

    const slug = job.agentName as AgentSlug
    const config = AGENTS[slug]
    if (!config) {
      await failJob(jobId, job.userId, job.agentName, job.agentName, 'Unknown agent.')
      return
    }

    await prisma.agentJob.update({
      where: { id: jobId },
      data: { status: 'running', startedAt: new Date(), progress: 5, step: 'Understanding request', error: null },
    })

    const setting = await prisma.setting.findUnique({ where: { userId: job.userId } })
    const apiKey = setting?.openaiApiKey ? decryptApiKey(setting.openaiApiKey) : null
    if (!apiKey) {
      await failJob(jobId, job.userId, slug, config.name, 'No OpenAI API key configured. Add it in Settings.')
      return
    }

    let inputs: Record<string, string> = {}
    try {
      inputs = JSON.parse(job.input) as Record<string, string>
    } catch {
      inputs = {}
    }

    await setProgress(jobId, 15, 'Building research plan')
    const prompt = buildPrompt(slug, inputs)

    let output: string | null = null
    let lastError = 'Agent execution failed.'

    for (let attempt = 1; attempt <= MAX_ATTEMPTS && !output; attempt += 1) {
      if (await jobCancelled(jobId)) return
      if (attempt > 1) {
        await prisma.agentJob.updateMany({
          where: { id: jobId, status: 'running' },
          data: { retryCount: attempt - 1 },
        })
        await setProgress(jobId, 25, `Retrying (attempt ${attempt} of ${MAX_ATTEMPTS})`)
        await delay(RETRY_DELAY_MS)
      } else {
        await setProgress(jobId, 35, 'Gathering data')
      }
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.5,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: prompt },
            ],
          }),
        })
        if (!response.ok) {
          if (response.status === 401) {
            lastError = 'Your OpenAI API key was rejected. Update it in Settings.'
            break
          }
          lastError = `OpenAI request failed (status ${response.status}).`
          continue
        }
        await setProgress(jobId, 60, 'Analyzing information')
        const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
        const content = data.choices?.[0]?.message?.content ?? ''
        if (!content) {
          lastError = 'OpenAI returned an empty response.'
          continue
        }
        await setProgress(jobId, 75, 'Generating insights')
        const report = parseAgentReport(content)
        if (!report) {
          lastError = 'The AI returned an invalid report structure.'
          continue
        }
        output = content
      } catch {
        lastError = 'Network error while contacting OpenAI.'
      }
    }

    if (await jobCancelled(jobId)) return

    if (!output) {
      await failJob(jobId, job.userId, slug, config.name, lastError)
      return
    }

    await setProgress(jobId, 85, 'Validating quality')
    await setProgress(jobId, 95, 'Formatting deliverables')

    const execution = await prisma.execution.create({
      data: { userId: job.userId, agentName: slug, input: job.input, output },
    })
    await prisma.agentJob.update({
      where: { id: jobId },
      data: {
        status: 'completed',
        progress: 100,
        step: 'Completed',
        executionId: execution.id,
        completedAt: new Date(),
        error: null,
      },
    })
    await createJobNotification(
      job.userId,
      'success',
      `${config.name} completed`,
      `${config.name} completed successfully. Your report is ready to view.`,
      slug,
      execution.id
    )
  } catch {
    try {
      const job = await prisma.agentJob.findUnique({ where: { id: jobId } })
      if (job && (job.status === 'queued' || job.status === 'running')) {
        await prisma.agentJob.update({
          where: { id: jobId },
          data: { status: 'failed', error: 'Agent execution failed unexpectedly.', step: 'Failed', completedAt: new Date() },
        })
        await createJobNotification(
          job.userId,
          'error',
          'Agent execution failed',
          'Agent execution failed unexpectedly. Click to retry.',
          job.agentName
        )
      }
    } catch {
      // final failure handling is best-effort
    }
  }
}
