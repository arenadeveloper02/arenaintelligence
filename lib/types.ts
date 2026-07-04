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

export type TrendDirection = 'up' | 'down' | 'flat'

export type PriorityLevel = 'high' | 'medium' | 'low'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface MetricItem {
  label: string
  value: string
  trend: TrendDirection
  context: string
}

export interface InsightItem {
  title: string
  description: string
  impactScore: number
  confidence: number
}

export interface RecommendationItem {
  title: string
  description: string
  priority: PriorityLevel
  impact: string
  difficulty: DifficultyLevel
}

export interface KeywordRow {
  keyword: string
  cluster: string
  intent: string
  volumeEstimate: string
  difficulty: string
  opportunityScore: number
}

export interface ArticleIdea {
  title: string
  summary: string
  relevanceScore: number
  intent: string
  tags: string[]
}

export interface ChartDatum {
  label: string
  value: number
}

export interface TimelinePhase {
  phase: string
  actions: string[]
}

export interface CitationItem {
  source: string
  url: string
  note: string
}

export interface AgentReport {
  title: string
  executiveSummary: string
  confidenceScore: number
  metrics: MetricItem[]
  insights: InsightItem[]
  recommendations: RecommendationItem[]
  keywords?: KeywordRow[]
  articles?: ArticleIdea[]
  intentDistribution?: ChartDatum[]
  actionPlan: TimelinePhase[]
  citations: CitationItem[]
}
