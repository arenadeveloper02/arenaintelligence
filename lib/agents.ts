import type {
  AgentConfig,
  AgentReport,
  AgentSlug,
  ChartDatum,
  CitationItem,
  DifficultyLevel,
  InsightItem,
  MetricItem,
  PriorityLevel,
  RecommendationItem,
  TimelinePhase,
  TrendDirection,
} from '@/lib/types'

export const AGENTS: Record<AgentSlug, AgentConfig> = {
  'keyword-research': {
    slug: 'keyword-research',
    name: 'Keyword Research Agent',
    tagline: 'Clusters, intent and opportunity scores',
    description: 'Generate keyword clusters, classify search intent, surface long-tail keywords and score content opportunities for any seed keyword.',
    gradient: 'from-indigo-500 to-cyan-400',
    fields: [
      { name: 'seedKeyword', label: 'Seed Keyword', placeholder: 'e.g. project management software', type: 'text', required: true },
      { name: 'country', label: 'Target Country', placeholder: 'e.g. United States', type: 'text', required: true },
      { name: 'language', label: 'Target Language', placeholder: 'e.g. English', type: 'text', required: true },
      { name: 'industry', label: 'Industry', placeholder: 'e.g. SaaS', type: 'text', required: true },
    ],
    actions: ['Keyword clusters', 'Search intent classification', 'Long-tail keywords', 'Content opportunities'],
  },
  'content-research': {
    slug: 'content-research',
    name: 'Content Research Agent',
    tagline: 'Gaps, questions and content outlines',
    description: 'Research any topic in depth — find content gaps, questions users ask, content clusters and a complete recommended heading structure.',
    gradient: 'from-cyan-500 to-blue-500',
    fields: [
      { name: 'topic', label: 'Topic', placeholder: 'e.g. remote team productivity', type: 'text', required: true },
      { name: 'industry', label: 'Industry', placeholder: 'e.g. HR Tech', type: 'text', required: true },
      { name: 'competitorUrls', label: 'Competitor URLs (optional)', placeholder: 'One URL per line', type: 'textarea', required: false },
    ],
    actions: ['Topic research', 'Content gaps', 'Questions users ask', 'Content clusters', 'Recommended headings'],
  },
  'article-recommendation': {
    slug: 'article-recommendation',
    name: 'Article Recommendation Agent',
    tagline: 'Ideas, titles and publishing plans',
    description: 'Get scored article ideas, suggested titles, trending topics, a 4-week content calendar and publishing recommendations.',
    gradient: 'from-purple-500 to-fuchsia-500',
    fields: [
      { name: 'topic', label: 'Topic', placeholder: 'e.g. AI in marketing', type: 'text', required: true },
      { name: 'keywords', label: 'Keywords', placeholder: 'e.g. ai marketing tools, automation', type: 'text', required: true },
      { name: 'industry', label: 'Industry', placeholder: 'e.g. Marketing', type: 'text', required: true },
    ],
    actions: ['Article ideas', 'Trending topics', 'Content calendar', 'Related resources'],
  },
}

export const AGENT_LIST: AgentConfig[] = [
  AGENTS['keyword-research'],
  AGENTS['content-research'],
  AGENTS['article-recommendation'],
]

export const SYSTEM_PROMPT = [
  'You are INTELLIGENCE by Position2, an elite multi-agent AI research platform.',
  'Internally you orchestrate a pipeline of specialized agents: a Planner agent that breaks down the request, a Research agent that gathers context, a Reasoning agent that derives insights and opportunities, a Generator agent that produces deliverables, a Validator agent that checks quality, completeness and prevents hallucinations, and a Formatter agent that converts everything into structured data.',
  'You always respond with a single valid JSON object matching the schema provided by the user — never markdown, never plain prose, never code fences.',
  'All estimates (search volumes, scores, trends) must be realistic, internally consistent and clearly framed as estimates in context fields.',
  'Every report must read like a consulting deliverable produced by an elite strategy team.',
].join(' ')

const BASE_SCHEMA = [
  'Return ONLY a single valid JSON object (no markdown fences, no commentary) with exactly these fields:',
  '{',
  '  "title": string (concise consultant-grade report title),',
  '  "executiveSummary": string (3-5 sentence executive summary),',
  '  "confidenceScore": number (overall confidence, 0-100),',
  '  "metrics": array of 4-6 objects { "label": string, "value": string, "trend": "up" | "down" | "flat", "context": string },',
  '  "insights": array of 4-6 objects { "title": string, "description": string, "impactScore": number (0-100), "confidence": number (0-100) },',
  '  "recommendations": array of 4-6 objects { "title": string, "description": string, "priority": "high" | "medium" | "low", "impact": string, "difficulty": "easy" | "medium" | "hard" },',
  '  "intentDistribution": array of 3-5 objects { "label": string, "value": number } showing search intent share as percentages,',
  '  "actionPlan": array of exactly 4 objects { "phase": string, "actions": array of 2-4 strings } using phases "Immediate", "30 Days", "60 Days", "90 Days",',
  '  "citations": array of 3-6 objects { "source": string, "url": string, "note": string }',
].join('\n')

const KEYWORD_SCHEMA_EXTRA =
  '  ,"keywords": array of 15-25 objects { "keyword": string, "cluster": string, "intent": "informational" | "navigational" | "transactional" | "commercial", "volumeEstimate": string (e.g. "1.2K/mo"), "difficulty": "low" | "medium" | "high", "opportunityScore": number (0-100) }'

const ARTICLE_SCHEMA_EXTRA =
  '  ,"articles": array of 6-10 objects { "title": string, "summary": string, "relevanceScore": number (0-100), "intent": string, "tags": array of 2-4 strings }'

export function buildPrompt(slug: AgentSlug, inputs: Record<string, string>): string {
  const lines: string[] = []
  if (slug === 'keyword-research') {
    lines.push(
      'Act as the Keyword Research pipeline. Perform comprehensive SEO keyword research.',
      '',
      `Seed keyword: ${inputs.seedKeyword ?? ''}`,
      `Target country: ${inputs.country ?? ''}`,
      `Target language: ${inputs.language ?? ''}`,
      `Industry: ${inputs.industry ?? ''}`,
      '',
      'Cover keyword clusters, search intent classification, long-tail variations, quick wins, low-competition keywords, commercial opportunities and content gap suggestions.',
      '',
      BASE_SCHEMA,
      KEYWORD_SCHEMA_EXTRA,
      '}'
    )
  } else if (slug === 'content-research') {
    lines.push(
      'Act as the Content Research pipeline. Perform in-depth content and competitive research.',
      '',
      `Topic: ${inputs.topic ?? ''}`,
      `Industry: ${inputs.industry ?? ''}`,
      `Competitor URLs: ${inputs.competitorUrls ?? 'none provided'}`,
      '',
      'Cover industry trends, competitor analysis, audience questions, topic clusters, content gaps, content opportunities, a recommended content calendar and SEO recommendations.',
      '',
      BASE_SCHEMA,
      '}'
    )
  } else {
    lines.push(
      'Act as the Article Recommendation pipeline. Recommend high-impact articles and a publishing plan.',
      '',
      `Topic: ${inputs.topic ?? ''}`,
      `Keywords: ${inputs.keywords ?? ''}`,
      `Industry: ${inputs.industry ?? ''}`,
      '',
      'Cover scored article ideas, suggested titles, trending topics, why each article matters, missing opportunities and recommended next steps.',
      '',
      BASE_SCHEMA,
      ARTICLE_SCHEMA_EXTRA,
      '}'
    )
  }
  return lines.join('\n')
}

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback
}

function asNumber(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

function asRecord(v: unknown): Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {}
}

function asArray(v: unknown): unknown[] {
  return Array.isArray(v) ? v : []
}

export function parseAgentReport(output: string): AgentReport | null {
  try {
    let text = output.trim()
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
    }
    const raw: unknown = JSON.parse(text)
    const obj = asRecord(raw)
    if (typeof obj.executiveSummary !== 'string' || obj.executiveSummary.length === 0) return null

    const metrics: MetricItem[] = asArray(obj.metrics).map((item) => {
      const r = asRecord(item)
      const trend: TrendDirection = r.trend === 'up' || r.trend === 'down' || r.trend === 'flat' ? r.trend : 'flat'
      return { label: asString(r.label, 'Metric'), value: asString(r.value, '—'), trend, context: asString(r.context) }
    })

    const insights: InsightItem[] = asArray(obj.insights).map((item) => {
      const r = asRecord(item)
      return {
        title: asString(r.title, 'Insight'),
        description: asString(r.description),
        impactScore: asNumber(r.impactScore, 50),
        confidence: asNumber(r.confidence, 50),
      }
    })

    const recommendations: RecommendationItem[] = asArray(obj.recommendations).map((item) => {
      const r = asRecord(item)
      const priority: PriorityLevel = r.priority === 'high' || r.priority === 'medium' || r.priority === 'low' ? r.priority : 'medium'
      const difficulty: DifficultyLevel = r.difficulty === 'easy' || r.difficulty === 'medium' || r.difficulty === 'hard' ? r.difficulty : 'medium'
      return {
        title: asString(r.title, 'Recommendation'),
        description: asString(r.description),
        priority,
        impact: asString(r.impact),
        difficulty,
      }
    })

    const keywords = asArray(obj.keywords)
      .map((item) => {
        const r = asRecord(item)
        return {
          keyword: asString(r.keyword),
          cluster: asString(r.cluster),
          intent: asString(r.intent, 'informational'),
          volumeEstimate: asString(r.volumeEstimate, '—'),
          difficulty: asString(r.difficulty, 'medium'),
          opportunityScore: asNumber(r.opportunityScore, 50),
        }
      })
      .filter((k) => k.keyword.length > 0)

    const articles = asArray(obj.articles)
      .map((item) => {
        const r = asRecord(item)
        return {
          title: asString(r.title),
          summary: asString(r.summary),
          relevanceScore: asNumber(r.relevanceScore, 50),
          intent: asString(r.intent, 'informational'),
          tags: asArray(r.tags).filter((t): t is string => typeof t === 'string'),
        }
      })
      .filter((a) => a.title.length > 0)

    const intentDistribution: ChartDatum[] = asArray(obj.intentDistribution)
      .map((item) => {
        const r = asRecord(item)
        return { label: asString(r.label), value: asNumber(r.value, 0) }
      })
      .filter((d) => d.label.length > 0)

    const actionPlan: TimelinePhase[] = asArray(obj.actionPlan).map((item) => {
      const r = asRecord(item)
      return {
        phase: asString(r.phase, 'Phase'),
        actions: asArray(r.actions).filter((a): a is string => typeof a === 'string'),
      }
    })

    const citations: CitationItem[] = asArray(obj.citations)
      .map((item) => {
        const r = asRecord(item)
        return { source: asString(r.source), url: asString(r.url), note: asString(r.note) }
      })
      .filter((c) => c.source.length > 0)

    return {
      title: asString(obj.title, 'AI Intelligence Report'),
      executiveSummary: obj.executiveSummary,
      confidenceScore: asNumber(obj.confidenceScore, 75),
      metrics,
      insights,
      recommendations,
      keywords: keywords.length > 0 ? keywords : undefined,
      articles: articles.length > 0 ? articles : undefined,
      intentDistribution: intentDistribution.length > 0 ? intentDistribution : undefined,
      actionPlan,
      citations,
    }
  } catch {
    return null
  }
}
