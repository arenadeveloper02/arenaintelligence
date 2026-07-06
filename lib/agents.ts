import type {
  AgentConfig,
  AgentReport,
  AgentSlug,
  ArticleIdea,
  ChartDatum,
  CitationItem,
  DifficultyLevel,
  InsightItem,
  KeywordIntent,
  KeywordRow,
  MetricItem,
  PriorityLevel,
  RecommendationItem,
  TimelinePhase,
  TrendDirection,
} from '@/lib/types'

/**
 * Knowledge Base clients available for injection into agent context,
 * mirroring the SEO Studio backend (`GET /api/kb`). Selecting a client
 * injects its brand KB, the relevant industry KB and any client-feedback
 * KB entries into the system context of the AI call.
 */
export const KB_CLIENTS: string[] = [
  'global',
  'gentle-dental',
  'great-lakes',
  'riccobene',
  'clear-behavioral-health',
  'neuro-wellness-spa',
  'new-life-house',
]

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
      { name: 'client', label: 'Client (optional KB context)', placeholder: 'e.g. gentle-dental, great-lakes, riccobene…', type: 'text', required: false },
      { name: 'feedbackKbIds', label: 'Feedback KB IDs (optional)', placeholder: 'Comma-separated client-feedback KB entry ids', type: 'text', required: false },
    ],
    actions: ['Query variants', 'SERP fetch', 'URL scoring', 'Keyword pull', 'AI shortlisting'],
  },
  'content-research': {
    slug: 'content-research',
    name: 'Content Research Agent',
    tagline: 'SERP analysis: patterns, benchmarks, semantics and gaps',
    description:
      'Analyzes the top-ranking pages for a target keyword and produces a writer-ready research brief: common H2/H3 patterns, word-count benchmarks, semantic keywords and content gaps.',
    gradient: 'from-cyan-500 to-blue-500',
    fields: [
      { name: 'keyword', label: 'Target Keyword', placeholder: 'e.g. dental implants recovery', type: 'text', required: true },
      { name: 'industry', label: 'Industry (optional)', placeholder: 'e.g. Dental / DSO', type: 'text', required: false },
      { name: 'competitorUrls', label: 'Competitor URLs (optional)', placeholder: 'One URL per line', type: 'textarea', required: false },
      { name: 'client', label: 'Client (optional KB context)', placeholder: 'e.g. gentle-dental, great-lakes, riccobene…', type: 'text', required: false },
      { name: 'feedbackKbIds', label: 'Feedback KB IDs (optional)', placeholder: 'Comma-separated client-feedback KB entry ids', type: 'text', required: false },
    ],
    actions: ['SERP analysis', 'H2/H3 patterns', 'Word count benchmarks', 'Semantic keywords', 'Content gaps'],
  },
  'article-recommendation': {
    slug: 'article-recommendation',
    name: 'Article Recommendation Agent',
    tagline: 'Complete ready-to-write article briefs',
    description:
      'Uses the scraped top-10 SERP pages for a target keyword to produce a complete article brief: recommended H1, an intent-mapped H2/H3 outline with per-section instructions and keywords, an FAQ section and a word-count target.',
    gradient: 'from-purple-500 to-fuchsia-500',
    fields: [
      { name: 'keyword', label: 'Target Keyword', placeholder: 'e.g. invisalign vs braces', type: 'text', required: true },
      { name: 'client', label: 'Client (optional KB context)', placeholder: 'e.g. gentle-dental, great-lakes, riccobene…', type: 'text', required: false },
      { name: 'feedbackKbIds', label: 'Feedback KB IDs (optional)', placeholder: 'Comma-separated client-feedback KB entry ids', type: 'text', required: false },
    ],
    actions: ['Recommended H1', 'H2/H3 outline', 'Section instructions', 'FAQ (PAA)', 'Word count target'],
  },
}

export const AGENT_LIST: AgentConfig[] = [
  AGENTS['keyword-research'],
  AGENTS['content-research'],
  AGENTS['article-recommendation'],
]

export const SYSTEM_PROMPT = [
  'You are INTELLIGENCE by Position2, an elite multi-agent AI research platform embedding the SEO Studio agent suite.',
  'Internally you orchestrate a pipeline of specialized agents: a Planner agent that breaks down the request, a Research agent that gathers context (SERP, scrape, keyword-data tools — simulated in this environment with realistic, internally consistent data), a Reasoning agent that derives insights and opportunities, a Generator agent that produces deliverables, a Validator agent that checks quality, completeness and prevents hallucinations, and a Formatter agent that converts everything into structured data.',
  'When a client or feedback knowledge-base context is provided in the user message, treat it as injected KNOWLEDGE BASE markdown: respect its brand voice, compliance rules and terminology in every deliverable.',
  'You always respond with a single valid JSON object matching the schema provided by the user — never markdown, never plain prose, never code fences.',
  'All estimates (search volumes, scores, trends) must be realistic, internally consistent and clearly framed as estimates in context fields.',
  'Every report must read like a consulting deliverable produced by an elite strategy team.',
].join(' ')

const REPORT_SCHEMA_LINES: string[] = [
  '',
  '═══════════════════════════════════════════',
  'FINAL OUTPUT FORMAT (mandatory)',
  '═══════════════════════════════════════════',
  'Return ONLY a single valid JSON object with exactly this schema. No markdown, no code fences, no text before or after the JSON.',
  '{',
  '  "title": "string — report title",',
  '  "executiveSummary": "string — 3 to 5 sentence executive summary of findings",',
  '  "confidenceScore": number between 0 and 100,',
  '  "metrics": [ { "label": "string", "value": "string", "trend": "up" | "down" | "flat", "context": "string" } ],',
  '  "insights": [ { "title": "string", "description": "string", "impactScore": number 0-100, "confidence": number 0-100 } ],',
  '  "recommendations": [ { "title": "string", "description": "string", "priority": "high" | "medium" | "low", "impact": "string", "difficulty": "easy" | "medium" | "hard" } ],',
  '  "keywords": [ { "keyword": "string", "cluster": "string", "intent": "string", "volumeEstimate": "string", "difficulty": "string", "opportunityScore": number 0-100 } ],',
  '  "articles": [ { "title": "string", "summary": "string", "relevanceScore": number 0-100, "intent": "string", "tags": ["string"] } ],',
  '  "intentDistribution": [ { "label": "string", "value": number } ],',
  '  "actionPlan": [ { "phase": "string", "actions": ["string"] } ],',
  '  "citations": [ { "source": "string", "url": "string", "note": "string" } ]',
  '}',
  'Include at least 3 metrics, 3 insights, 3 recommendations, a 3-4 phase actionPlan and 3-6 citations. Arrays that do not apply to this agent may be empty arrays, never omitted.',
]

function kbContextLines(client: string, feedbackKbIds: string): string[] {
  const lines: string[] = ['OPTIONAL INPUTS (knowledge base context):']
  if (client) {
    lines.push(
      `- client: ${client} — inject this client's brand KB plus the relevant industry KB into your reasoning (available clients: ${KB_CLIENTS.join(', ')}).`
    )
  } else {
    lines.push('- client: none provided')
  }
  if (feedbackKbIds) {
    lines.push(`- feedbackKbIds: ${feedbackKbIds} — inject these specific client-feedback KB entries into your reasoning.`)
  } else {
    lines.push('- feedbackKbIds: none provided')
  }
  return lines
}

export function buildPrompt(slug: AgentSlug, inputs: Record<string, string>): string {
  const lines: string[] = []
  const client = (inputs.client ?? '').trim()
  const feedbackKbIds = (inputs.feedbackKbIds ?? '').trim()

  if (slug === 'keyword-research') {
    const intent: KeywordIntent =
      (inputs.intent ?? '').trim().toLowerCase() === 'commercial' ? 'commercial' : 'informational'
    lines.push(
      'You are an autonomous SEO Keyword Research agent. You run a fixed 5-step pipeline and must complete every step in order. Do not skip steps or shortcut the pipeline.',
      'In this environment your search/SERP tool and keyword-data tool (e.g. SEMrush) are simulated: perform each tool call internally using your expert SEO knowledge and produce realistic, internally consistent data (volumes, difficulties, positions, URLs). Steps 1-4 are internal working steps; only the Step 5 report is emitted as your final answer.',
      '',
      'INPUTS (required):',
      `- keyword (seed keyword): ${inputs.keyword ?? ''}`,
      `- intent: ${intent}`,
      ...kbContextLines(client, feedbackKbIds),
      client ? 'Because client is set, also load and apply the best-practices KB entry "keyword-research-bp" in Step 5.' : '',
      '',
      'STEP 1 — QUERY VARIANTS: Generate 5-6 query variants a real user would type into Google, based on the seed keyword and intent. Commercial intent: service pages, pricing, booking, "near me", comparison and consultation queries. Informational intent: guides, FAQs, how-to, symptoms, definitions and educational queries. Always include the original seed keyword as the first variant.',
      'STEP 2 — SERP FETCH (tool call): For each query variant, call your search/SERP tool (Google US results) and collect the returned URLs. Pool all candidate URLs across all variants into one deduplicated list.',
      'STEP 3 — URL SCORING: Score and rank the pooled candidate URLs by page-type relevance to the seed topic and intent, SERP position, and query coverage. Penalize off-topic pages, aggregators and directory spam. Keep the top 10 competitor URLs.',
      'STEP 4 — KEYWORD PULL (tool call): For each of the top 10 competitor URLs, pull its ranking keywords with keyword, volume, difficulty, position and source URL. Deduplicate into a single pooled keyword list.',
      'STEP 5 — AI SHORTLISTING (final output): Acting as an expert SEO keyword analyst, shortlist exactly 2 PRIMARY keywords and 10 SECONDARY keywords from the pool.',
      'PRIMARY rules: must semantically match the seed topic and stated intent, must represent distinct angles, must have meaningful volume and rankable difficulty. SECONDARY rules: support the primary topic cluster with a mix of head, mid-tail and long-tail terms; do not repeat primary keywords. Exclude branded competitor names unless the client IS that brand, and exclude keywords with no meaningful connection to the seed topic.',
      'Map the shortlist into the final report: put all 12 shortlisted keywords in the "keywords" array with cluster set to "primary" or "secondary", intent set to the stated intent, volumeEstimate as an estimated monthly-search string, difficulty as "low" | "medium" | "high" and a 0-100 opportunityScore. Explain the rationale for each primary keyword in "insights", summarize the pipeline in "metrics" and "executiveSummary", provide next steps in "recommendations" and "actionPlan", and list simulated data sources in "citations". Set "intentDistribution" to the intent mix of the pooled keywords.'
    )
  } else if (slug === 'content-research') {
    const competitorUrls = (inputs.competitorUrls ?? '').trim()
    lines.push(
      'You are a senior SEO content strategist running the Content Research (SERP Analysis) pipeline.',
      'In this environment your SERP fetch and page-scraping tools are simulated: perform each tool call internally using your expert SEO knowledge and produce realistic, internally consistent data.',
      '',
      'INPUTS (required):',
      `- keyword (target keyword): ${inputs.keyword ?? ''}`,
      `- industry: ${(inputs.industry ?? '').trim() || 'not provided — infer from the keyword'}`,
      competitorUrls
        ? `- competitorUrls (analyze these in addition to the SERP): ${competitorUrls.split(/\n+/).map((u) => u.trim()).filter(Boolean).join(', ')}`
        : '- competitorUrls: none provided — rely on the simulated SERP top 10',
      ...kbContextLines(client, feedbackKbIds),
      '',
      'PIPELINE: (1) Fetch the top 10 ranking pages for the target keyword. (2) Scrape each page and extract its H2/H3 structure, word count and covered subtopics. (3) Identify common heading patterns and how frequently each appears across the top 10. (4) Compute word-count benchmarks (min, max, median, recommended target). (5) Extract semantic and related keywords the top pages consistently use. (6) Identify content gaps — questions and subtopics users care about that the top pages under-serve.',
      'Map the deliverables into the final report: put semantic and related keywords in the "keywords" array (cluster "semantic" or "related", with intent, volumeEstimate, difficulty and opportunityScore). Put common H2/H3 patterns and their frequency in "insights". Put word-count benchmarks and SERP statistics in "metrics". Put content-gap opportunities in "recommendations". Put a writer-ready production sequence in "actionPlan". List the analyzed (simulated) top-ranking URLs in "citations". Set "intentDistribution" to the intent mix observed across the top-ranking pages. Leave "articles" as an empty array.'
    )
  } else {
    lines.push(
      'You are a senior SEO content strategist running the Article Recommendation pipeline: you turn a scraped top-10 SERP analysis into a complete, ready-to-write article brief.',
      'In this environment your SERP fetch and page-scraping tools are simulated: perform each tool call internally using your expert SEO knowledge and produce realistic, internally consistent data.',
      '',
      'INPUTS (required):',
      `- keyword (target keyword): ${inputs.keyword ?? ''}`,
      ...kbContextLines(client, feedbackKbIds),
      '',
      'PIPELINE: (1) Fetch and scrape the top 10 ranking pages for the target keyword. (2) Derive the dominant search intent and the winning content format. (3) Produce a recommended H1 plus 2-3 strong alternative titles. (4) Build an intent-mapped H2/H3 outline where every section has clear writer instructions and target keywords. (5) Compile a People-Also-Ask style FAQ list with answer guidance. (6) Set a word-count target justified by SERP benchmarks.',
      'Map the deliverables into the final report: put the recommended H1 and alternative titles in the "articles" array (title, summary describing the angle, relevanceScore, intent and tags). Put every outline section in "actionPlan" — phase is the H2 heading and actions are the writer instructions, target keywords and any H3 subheadings for that section. Put FAQ questions with answer guidance in "recommendations". Put word-count target and SERP benchmarks in "metrics". Put intent and format findings in "insights". List the analyzed (simulated) top-ranking URLs in "citations". Set "intentDistribution" to the intent mix across the top 10 pages. Leave "keywords" as an empty array unless section target keywords are worth surfacing there.'
    )
  }

  lines.push(...REPORT_SCHEMA_LINES)
  return lines.filter((l) => l !== '').concat('').join('\n')
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function asString(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback
}

function asNumber(v: unknown, fallback = 0): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string') {
    const n = Number(v)
    if (Number.isFinite(n)) return n
  }
  return fallback
}

function clampScore(n: number): number {
  return Math.min(Math.max(n, 0), 100)
}

function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

function asRecordArray(v: unknown): Record<string, unknown>[] {
  return Array.isArray(v) ? v.filter(isRecord) : []
}

function toTrend(v: unknown): TrendDirection {
  return v === 'up' || v === 'down' ? v : 'flat'
}

function toPriority(v: unknown): PriorityLevel {
  return v === 'high' || v === 'low' ? v : 'medium'
}

function toDifficulty(v: unknown): DifficultyLevel {
  return v === 'easy' || v === 'hard' ? v : 'medium'
}

/**
 * Parses and validates raw model output into a typed AgentReport.
 * Returns null when the payload is not valid JSON or is missing the
 * required title/executiveSummary fields.
 */
export function parseAgentReport(raw: string): AgentReport | null {
  try {
    let text = raw.trim()
    if (text.startsWith('```')) {
      text = text.replace(/^```[a-zA-Z]*\s*/, '').replace(/```\s*$/, '').trim()
    }
    const parsedUnknown: unknown = JSON.parse(text)
    if (!isRecord(parsedUnknown)) return null
    const parsed = parsedUnknown

    const title = asString(parsed.title).trim()
    const executiveSummary = asString(parsed.executiveSummary).trim()
    if (!title || !executiveSummary) return null

    const metrics: MetricItem[] = asRecordArray(parsed.metrics)
      .map((m) => ({
        label: asString(m.label),
        value: asString(m.value),
        trend: toTrend(m.trend),
        context: asString(m.context),
      }))
      .filter((m) => m.label.length > 0)

    const insights: InsightItem[] = asRecordArray(parsed.insights)
      .map((i) => ({
        title: asString(i.title),
        description: asString(i.description),
        impactScore: clampScore(asNumber(i.impactScore, 50)),
        confidence: clampScore(asNumber(i.confidence, 50)),
      }))
      .filter((i) => i.title.length > 0)

    const recommendations: RecommendationItem[] = asRecordArray(parsed.recommendations)
      .map((r) => ({
        title: asString(r.title),
        description: asString(r.description),
        priority: toPriority(r.priority),
        impact: asString(r.impact),
        difficulty: toDifficulty(r.difficulty),
      }))
      .filter((r) => r.title.length > 0)

    const keywords: KeywordRow[] = asRecordArray(parsed.keywords)
      .map((k) => ({
        keyword: asString(k.keyword),
        cluster: asString(k.cluster),
        intent: asString(k.intent),
        volumeEstimate: asString(k.volumeEstimate, String(asNumber(k.volumeEstimate, 0))),
        difficulty: asString(k.difficulty, String(asNumber(k.difficulty, 0))),
        opportunityScore: clampScore(asNumber(k.opportunityScore, 50)),
      }))
      .filter((k) => k.keyword.length > 0)

    const articles: ArticleIdea[] = asRecordArray(parsed.articles)
      .map((a) => ({
        title: asString(a.title),
        summary: asString(a.summary),
        relevanceScore: clampScore(asNumber(a.relevanceScore, 50)),
        intent: asString(a.intent),
        tags: asStringArray(a.tags),
      }))
      .filter((a) => a.title.length > 0)

    const intentDistribution: ChartDatum[] = asRecordArray(parsed.intentDistribution)
      .map((d) => ({
        label: asString(d.label),
        value: asNumber(d.value, 0),
      }))
      .filter((d) => d.label.length > 0)

    const actionPlan: TimelinePhase[] = asRecordArray(parsed.actionPlan)
      .map((p) => ({
        phase: asString(p.phase),
        actions: asStringArray(p.actions),
      }))
      .filter((p) => p.phase.length > 0)

    const citations: CitationItem[] = asRecordArray(parsed.citations)
      .map((c) => ({
        source: asString(c.source),
        url: asString(c.url),
        note: asString(c.note),
      }))
      .filter((c) => c.source.length > 0)

    const report: AgentReport = {
      title,
      executiveSummary,
      confidenceScore: clampScore(asNumber(parsed.confidenceScore, 70)),
      metrics,
      insights,
      recommendations,
      actionPlan,
      citations,
    }
    if (keywords.length > 0) report.keywords = keywords
    if (articles.length > 0) report.articles = articles
    if (intentDistribution.length > 0) report.intentDistribution = intentDistribution
    return report
  } catch {
    return null
  }
}
