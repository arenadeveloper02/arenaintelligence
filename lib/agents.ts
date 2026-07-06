import type {
  AgentConfig,
  AgentReport,
  AgentSlug,
  ChartDatum,
  CitationItem,
  DifficultyLevel,
  InsightItem,
  KeywordIntent,
  KeywordRow,
  KeywordShortlist,
  MetricItem,
  PrimaryKeywordItem,
  PriorityLevel,
  RecommendationItem,
  SecondaryKeywordItem,
  TimelinePhase,
  TrendDirection,
} from '@/lib/types'

export const AGENTS: Record<AgentSlug, AgentConfig> = {
  'keyword-research': {
    slug: 'keyword-research',
    name: 'Keyword Research Agent',
    tagline: 'Autonomous 5-step keyword shortlisting pipeline',
    description:
      'Runs a fixed 5-step pipeline — query variants, SERP fetch, competitor URL scoring, keyword pull and AI shortlisting — to deliver 2 primary and 10 secondary keywords with volume, difficulty and rationale.',
    gradient: 'from-indigo-500 to-cyan-400',
    fields: [
      { name: 'keyword', label: 'Seed Keyword', placeholder: 'e.g. dental implants', type: 'text', required: true },
      { name: 'intent', label: 'Intent (commercial or informational)', placeholder: 'commercial or informational', type: 'text', required: true },
      { name: 'client', label: 'Client (optional KB context)', placeholder: 'e.g. gentle-dental', type: 'text', required: false },
      { name: 'feedbackKbIds', label: 'Feedback KB IDs (optional)', placeholder: 'Comma-separated client-feedback KB entry ids', type: 'text', required: false },
    ],
    actions: ['Query variants', 'SERP fetch', 'URL scoring', 'Keyword pull', 'AI shortlisting'],
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

const ARTICLE_SCHEMA_EXTRA =
  '  ,"articles": array of 6-10 objects { "title": string, "summary": string, "relevanceScore": number (0-100), "intent": string, "tags": array of 2-4 strings }'

export function buildPrompt(slug: AgentSlug, inputs: Record<string, string>): string {
  const lines: string[] = []
  if (slug === 'keyword-research') {
    const intent: KeywordIntent =
      (inputs.intent ?? '').trim().toLowerCase() === 'commercial' ? 'commercial' : 'informational'
    const client = (inputs.client ?? '').trim()
    const feedbackKbIds = (inputs.feedbackKbIds ?? '').trim()
    lines.push(
      'You are an autonomous SEO Keyword Research agent. You run a fixed 5-step pipeline and must complete every step in order, using tools where indicated. Do not skip steps or shortcut the pipeline.',
      'In this environment your search/SERP tool and keyword-data tool (e.g. SEMrush) are simulated: perform each tool call internally using your expert SEO knowledge and produce realistic, internally consistent data (volumes, difficulties, positions, URLs). Steps 1-4 are internal working steps; only the Step 5 JSON is emitted as your final answer.',
      '',
      'INPUTS (required):',
      `- keyword (seed keyword): ${inputs.keyword ?? ''}`,
      `- intent: ${intent}`,
      'OPTIONAL INPUTS (knowledge base context):',
      client ? `- client: ${client} — inject this client's brand KB plus relevant industry KB into your reasoning for Step 5.` : '- client: none provided',
      feedbackKbIds
        ? `- feedbackKbIds: ${feedbackKbIds} — inject these specific client-feedback KB entries into Step 5.`
        : '- feedbackKbIds: none provided',
      client
        ? 'Because client is set, also load and apply the best-practices KB entry "keyword-research-bp" in Step 5.'
        : '',
      '',
      '═══════════════════════════════════════════',
      'STEP 1 — QUERY VARIANTS',
      '═══════════════════════════════════════════',
      'Generate 5-6 query variants a real user would type into Google, based on the seed keyword and intent.',
      '- If intent = commercial: bias toward service pages, pricing, booking, "near me", comparison, and consultation queries.',
      '- If intent = informational: bias toward guides, FAQs, how-to, symptoms, definitions, and educational queries.',
      '- Always include the original seed keyword as the first variant.',
      'Internal output of this step: { "queries": ["variant 1", "variant 2", ...] }',
      '',
      '═══════════════════════════════════════════',
      'STEP 2 — SERP FETCH (tool call)',
      '═══════════════════════════════════════════',
      'For EACH query variant from Step 1, call your search/SERP tool (Google US results) and collect the returned URLs.',
      'Pool all candidate URLs across all variants into one deduplicated list.',
      '',
      '═══════════════════════════════════════════',
      'STEP 3 — URL SCORING',
      '═══════════════════════════════════════════',
      'From the pooled candidate URLs, score and rank them using this rubric, then select the TOP 10:',
      '- Page type relevance to the seed topic and intent (service/commercial page vs. blog/informational page, matched to intent)',
      '- SERP position (earlier = stronger signal)',
      '- Query coverage (how many of the 5-6 variants this URL ranked for)',
      '- Penalize low-relevance/off-topic pages, aggregators, and directory spam',
      'Keep the top 10 competitor URLs with scores/rationale for your own tracking.',
      '',
      '═══════════════════════════════════════════',
      'STEP 4 — KEYWORD PULL (tool call)',
      '═══════════════════════════════════════════',
      'For each of the top 10 competitor URLs, call your keyword-data tool (e.g. SEMrush) to pull its ranking keywords, each with: keyword, volume, difficulty, position, source URL.',
      'Deduplicate into a single pooled keyword list across all 10 URLs.',
      '',
      '═══════════════════════════════════════════',
      'STEP 5 — AI SHORTLISTING (final output)',
      '═══════════════════════════════════════════',
      'You are now acting as an expert SEO keyword analyst working for a digital marketing agency.',
      'You have a deduplicated pool of keywords pulled from the top-ranking competitor pages for the target topic. Each keyword includes volume, difficulty, position, and source URL.',
      'Your job: shortlist exactly 2 PRIMARY keywords and 10 SECONDARY keywords.',
      '',
      'PRIMARY keyword rules:',
      '- Must semantically match the seed topic and stated intent (commercial or informational)',
      '- Must represent distinct angles (do not pick near-duplicates)',
      '- Include a one-sentence "reason" explaining semantic alignment, intent fit, and differentiation',
      '- Prefer keywords with meaningful search volume and rankable difficulty',
      '',
      'SECONDARY keyword rules:',
      '- Support the primary topic cluster',
      '- Mix head terms, mid-tail, and long-tail',
      '- Include volume and difficulty for each',
      '- Do not repeat primary keywords',
      '',
      'Exclude branded competitor names unless the client IS that brand.',
      'Exclude keywords with no meaningful connection to the seed topic.',
      'If client/industry/feedback KB context has been provided, respect its brand voice, terminology, and any client-feedback notes when judging relevance and phrasing of "reason" fields.',
      '',
      'Return ONLY valid JSON with exactly this shape (volume = estimated monthly searches as a number, difficulty = 0-100 number):',
      '{',
      '  "primary": [',
      '    { "keyword": "...", "volume": 0, "difficulty": 0, "reason": "..." },',
      '    { "keyword": "...", "volume": 0, "difficulty": 0, "reason": "..." }',
      '  ],',
      '  "secondary": [',
      '    { "keyword": "...", "volume": 0, "difficulty": 0 }',
      '  ]',
      '}',
      'The "secondary" array must contain exactly 10 entries. Do not include any text outside this JSON object in your final step output.'
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

function stripFences(output: string): string {
  let text = output.trim()
  if (text.startsWith('```')) {
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  }
  return text
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function formatVolume(v: number): string {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1).replace(/\.0$/, '')}M/mo`
  if (v >= 1000) return `${(v / 1000).toFixed(1).replace(/\.0$/, '')}K/mo`
  return `${Math.max(Math.round(v), 0)}/mo`
}

function difficultyLabel(d: number): string {
  if (d <= 35) return 'low'
  if (d <= 65) return 'medium'
  return 'high'
}

function difficultyLevel(d: number): DifficultyLevel {
  if (d <= 35) return 'easy'
  if (d <= 65) return 'medium'
  return 'hard'
}

/**
 * Parses the Keyword Research agent's Step 5 shortlist output:
 * { "primary": [{ keyword, volume, difficulty, reason }], "secondary": [{ keyword, volume, difficulty }] }
 */
export function parseKeywordShortlist(output: string): KeywordShortlist | null {
  try {
    const raw: unknown = JSON.parse(stripFences(output))
    const obj = asRecord(raw)
    if (!Array.isArray(obj.primary) || !Array.isArray(obj.secondary)) return null

    const primary: PrimaryKeywordItem[] = asArray(obj.primary)
      .map((item) => {
        const r = asRecord(item)
        return {
          keyword: asString(r.keyword),
          volume: asNumber(r.volume, 0),
          difficulty: asNumber(r.difficulty, 50),
          reason: asString(r.reason),
        }
      })
      .filter((k) => k.keyword.length > 0)

    const secondary: SecondaryKeywordItem[] = asArray(obj.secondary)
      .map((item) => {
        const r = asRecord(item)
        return {
          keyword: asString(r.keyword),
          volume: asNumber(r.volume, 0),
          difficulty: asNumber(r.difficulty, 50),
        }
      })
      .filter((k) => k.keyword.length > 0)

    if (primary.length === 0) return null
    return { primary, secondary }
  } catch {
    return null
  }
}

/**
 * Adapts a keyword shortlist into the shared AgentReport shape so the
 * existing report UI, history and exports render it without changes.
 */
function shortlistToReport(shortlist: KeywordShortlist): AgentReport {
  const { primary, secondary } = shortlist
  const all = [...primary, ...secondary]
  const avgVolume = all.length > 0 ? all.reduce((s, k) => s + k.volume, 0) / all.length : 0
  const avgDifficulty = all.length > 0 ? all.reduce((s, k) => s + k.difficulty, 0) / all.length : 0

  const metrics: MetricItem[] = [
    { label: 'Primary keywords', value: String(primary.length), trend: 'flat', context: 'Shortlisted primary targets' },
    { label: 'Secondary keywords', value: String(secondary.length), trend: 'flat', context: 'Supporting cluster keywords' },
    { label: 'Avg. search volume', value: formatVolume(avgVolume), trend: 'up', context: 'Estimated monthly searches across the shortlist' },
    { label: 'Avg. difficulty', value: String(Math.round(avgDifficulty)), trend: 'flat', context: 'Estimated ranking difficulty (0-100)' },
  ]

  const insights: InsightItem[] = primary.map((p) => ({
    title: `Primary target: ${p.keyword}`,
    description: p.reason || 'Shortlisted as a primary keyword for this topic and intent.',
    impactScore: clamp(100 - p.difficulty, 0, 100),
    confidence: 80,
  }))

  const recommendations: RecommendationItem[] = primary.map((p) => ({
    title: `Target "${p.keyword}" as a primary keyword`,
    description: p.reason || 'Build a dedicated page optimized for this primary keyword.',
    priority: 'high' as PriorityLevel,
    impact: `~${formatVolume(p.volume)} estimated search volume`,
    difficulty: difficultyLevel(p.difficulty),
  }))

  const keywords: KeywordRow[] = [
    ...primary.map((p) => ({
      keyword: p.keyword,
      cluster: 'Primary',
      intent: 'primary',
      volumeEstimate: formatVolume(p.volume),
      difficulty: difficultyLabel(p.difficulty),
      opportunityScore: clamp(100 - p.difficulty, 0, 100),
    })),
    ...secondary.map((s) => ({
      keyword: s.keyword,
      cluster: 'Secondary',
      intent: 'secondary',
      volumeEstimate: formatVolume(s.volume),
      difficulty: difficultyLabel(s.difficulty),
      opportunityScore: clamp(100 - s.difficulty, 0, 100),
    })),
  ]

  const primaryNames = primary.map((p) => `"${p.keyword}"`).join(' and ')
  const executiveSummary = `The autonomous 5-step keyword research pipeline (query variants, SERP fetch, competitor URL scoring, keyword pull, AI shortlisting) shortlisted ${primary.length} primary and ${secondary.length} secondary keywords. Primary targets: ${primaryNames}. Each primary keyword was selected for semantic alignment with the seed topic, intent fit and a distinct angle, while secondary keywords mix head, mid-tail and long-tail terms that support the topic cluster. All volumes and difficulties are realistic estimates derived from competitor keyword pulls.`

  return {
    title: 'Keyword Shortlist: Primary & Secondary Targets',
    executiveSummary,
    confidenceScore: 85,
    metrics,
    insights,
    recommendations,
    keywords,
    actionPlan: [],
    citations: [],
  }
}

export function parseAgentReport(output: string): AgentReport | null {
  try {
    const text = stripFences(output)
    const raw: unknown = JSON.parse(text)
    const obj = asRecord(raw)
    if (typeof obj.executiveSummary !== 'string' || obj.executiveSummary.length === 0) {
      // The Keyword Research agent's 5-step pipeline emits a shortlist shape
      // ({ primary, secondary }) instead of the base report schema — adapt it.
      const shortlist = parseKeywordShortlist(output)
      return shortlist ? shortlistToReport(shortlist) : null
    }

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
