export interface SessionUser {
  id: string
  email: string
}

export type AgentSlug = 'keyword-research' | 'content-research' | 'article-recommendation'

export interface AgentField {
  name: string
  label: string
  placeholder: string
  type: 'text' | 'textarea'
  required: boolean
}

export interface AgentConfig {
  slug: AgentSlug
  name: string
  tagline: string
  description: string
  gradient: string
  fields: AgentField[]
  actions: string[]
}

export interface ExecutionData {
  id: string
  agentName: string
  input: string
  output: string
  createdAt: string
}

export interface AgentLastRun {
  slug: AgentSlug
  lastRunAt: string | null
}

export interface DashboardData {
  hasApiKey: boolean
  totalExecutions: number
  lastRuns: AgentLastRun[]
  recentExecutions: ExecutionData[]
}

export interface ApiKeyStatus {
  configured: boolean
  maskedKey: string | null
  updatedAt: string | null
}

export interface ActionResult {
  success: boolean
  error?: string
}
