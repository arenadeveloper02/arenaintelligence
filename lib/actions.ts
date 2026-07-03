import { prisma } from '@/lib/prisma'
import { decryptApiKey, maskApiKey } from '@/lib/auth'
import { AGENT_LIST } from '@/lib/agents'
import type { AgentSlug, ApiKeyStatus, DashboardData, ExecutionData } from '@/lib/types'

function toExecutionData(e: { id: string; agentName: string; input: string; output: string; createdAt: Date }): ExecutionData {
  return {
    id: e.id,
    agentName: e.agentName,
    input: e.input,
    output: e.output,
    createdAt: e.createdAt.toISOString(),
  }
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const setting = await prisma.setting.findUnique({ where: { userId } })
  const executions = await prisma.execution.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })
  const total = await prisma.execution.count({ where: { userId } })
  const lastRuns = AGENT_LIST.map((agent) => {
    const last = executions.find((e) => e.agentName === agent.slug)
    return { slug: agent.slug, lastRunAt: last ? last.createdAt.toISOString() : null }
  })
  return {
    hasApiKey: Boolean(setting?.openaiApiKey),
    totalExecutions: total,
    lastRuns,
    recentExecutions: executions.slice(0, 5).map(toExecutionData),
  }
}

export async function getApiKeyStatus(userId: string): Promise<ApiKeyStatus> {
  const setting = await prisma.setting.findUnique({ where: { userId } })
  if (!setting || !setting.openaiApiKey) {
    return { configured: false, maskedKey: null, updatedAt: null }
  }
  const plain = decryptApiKey(setting.openaiApiKey)
  if (!plain) {
    return { configured: false, maskedKey: null, updatedAt: null }
  }
  return {
    configured: true,
    maskedKey: maskApiKey(plain),
    updatedAt: setting.updatedAt.toISOString(),
  }
}

export async function getHasApiKey(userId: string): Promise<boolean> {
  const setting = await prisma.setting.findUnique({ where: { userId } })
  return Boolean(setting?.openaiApiKey)
}

export async function getAgentExecutions(userId: string, agentName: AgentSlug): Promise<ExecutionData[]> {
  const executions = await prisma.execution.findMany({
    where: { userId, agentName },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return executions.map(toExecutionData)
}

export async function getAllExecutions(userId: string): Promise<ExecutionData[]> {
  const executions = await prisma.execution.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })
  return executions.map(toExecutionData)
}
