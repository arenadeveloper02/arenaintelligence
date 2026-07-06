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
      client
        ? `- client: ${client} — inject this client's brand KB plus relevant industry KB into your reasoning for Step 5 (available clients: ${KB_CLIENTS.join(', ')}).`
        : '- client: none provided',
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
      'You are an expert SEO keyword strategist. Generate 5-6 query variants a real user would type into Google, based on the seed keyword and intent.',
      '- If intent = commercial: focus on service pages, pricing, booking, "near me", comparison, and consultation queries.',
      '- If intent = informational: focus on guides, FAQs, how-to, symptoms, definitions, and educational queries.',
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
      'Your job: shortlist exactly 2 PRIMARY keywords and 10 SECONDARY keywords for a content/SEO campaign.',
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
    const client = (inputs.client ?? '').trim()
    const feedbackKbIds = (inputs.feedbackKbIds ?? '').trim()
    lines.push(
      'You are a senior SEO content strategist running the Content Research (SERP Analysis) pipeline.',
      'In this environment your SERP fetch and page-scraping tools are simulated: internally retrieve the top-ranking Google pages for the target keyword and scrape their titles, headings and content using your expert SEO knowledge, producing realistic, internally consistent data. Only the final JSON brief is emitted.',
      '',
      'INPUTS:',
      `- keyword (target keyword): ${inputs.keyword ?? ''}`,
      `- industry: ${(inputs.industry ?? '').trim() || 'not specified'}`,
      `- competitorUrls: ${(inputs.competitorUrls ?? '').trim() || 'none provided — rely on simulated SERP results'}`,
      client
        ? `- client: ${client} — inject this client's brand KB plus relevant industry KB (available clients: ${KB_CLIENTS.join(', ')}), and apply the best-practices KB entry "article-creation".`
        : '- client: none provided',
      feedbackKbIds
        ? `- feedbackKbIds: ${feedbackKbIds} — apply these client-feedback KB entries (brand voice, compliance rules, terminology).`
        : '- feedbackKbIds: none provided',
      '',
      'Analyze the scraped content from the top-ranking pages for the target keyword. Produce a content research brief a writer can act on immediately.',
      '',
      'Focus on:',
      '1. Common H2/H3 patterns across ranking pages',
      '2. Word count benchmarks (min, max, median, recommended target)',
      '3. Semantic keywords and entities the top pages cover',
      '4. Content gaps — topics/questions competitors answer that should be included',
      '5. Recommended article structure (section-by-section)',
      '',
      'Respect any client brand voice, compliance rules, and terminology from the knowledge base context above.',
      '',
      'Return ONLY valid JSON with exactly this shape:',
      '{',
      '  "sections": [',
      '    { "heading": "H2 or H3 text", "frequency": "how many top pages use this", "notes": "what to cover in this section" }',
      '  ],',
      '  "wordCountBenchmark": { "min": 0, "max": 0, "median": 0, "recommended": 0 },',
      '  "semanticKeywords": ["..."],',
      '  "contentGaps": ["gap or question to address"]',
      '}',
      'Do not include any text outside this JSON object.'
    )
  } else {
    const client = (inputs.client ?? '').trim()
    const feedbackKbIds = (inputs.feedbackKbIds ?? '').trim()
    lines.push(
      'You are an expert SEO content brief architect running the Article Recommendation (Full Brief) pipeline.',
      'In this environment your SERP fetch and page-scraping tools are simulated: internally retrieve and scrape the top-10 SERP pages for the target keyword using your expert SEO knowledge, producing realistic, internally consistent data. Only the final JSON brief is emitted.',
      '',
      'INPUTS:',
      `- keyword (target keyword): ${inputs.keyword ?? ''}`,
      client
        ? `- client: ${client} — inject this client's brand KB plus relevant industry KB (available clients: ${KB_CLIENTS.join(', ')}), and apply the best-practices KB entry "article-creation".`
        : '- client: none provided',
      feedbackKbIds
        ? `- feedbackKbIds: ${feedbackKbIds} — apply these client-feedback KB entries (brand voice, compliance rules, terminology).`
        : '- feedbackKbIds: none provided',
      '',
      'Using the scraped top-10 SERP pages for the target keyword, produce a complete, ready-to-write article brief.',
      '',
      'The brief must include:',
      '- Recommended H1 (one option, compelling, keyword-natural)',
      '- Full H2/H3 outline mapped to search intent',
      '- Per-section writing instructions (tone, depth, what to include)',
      '- Primary and secondary keywords assigned to each section',
      '- FAQ section: 5-10 questions extracted from PAA/competitor patterns, each with answer guidance',
      '- Word count target',
      '',
      'Return ONLY valid JSON with exactly this shape:',
      '{',
      '  "recommendedH1": "one compelling, keyword-natural H1",',
      '  "wordCountTarget": 0,',
      '  "outline": [',
      '    { "heading": "H2 or H3 text", "level": "H2" or "H3", "intent": "search intent this section serves", "instructions": "tone, depth, what to include", "keywords": ["primary/secondary keywords assigned to this section"] }',
      '  ],',
      '  "faq": [ { "question": "...", "answerGuidance": "..." } ]',
      '}',
      'Do not include any text outside this JSON object.'
    )
  }
  return lines.join('\n')
}

function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback
}

function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
}

function recArr(v: unknown): Record<string, unknown>[] {
  if (!Array.isArray(v)) return []
  return v.filter((x): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x))
}

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max)
}

function toTrend(v: unknown): TrendDirection {
  return v === 'up' || v === 'down' || v === 'flat' ? v : 'flat'
}

function toPriority(v: unknown): PriorityLevel {
  return v === 'high' || v === 'medium' || v === 'low' ? v : 'medium'
}

function toDifficulty(v: unknown): DifficultyLevel {
  return v === 'easy' || v === 'medium' || v === 'hard' ? v : 'medium'
}

function toMetrics(v: unknown): MetricItem[] {
  return recArr(v).map((m) => ({
    label: str(m.label, 'Metric'),
    value: str(m.value, typeof m.value === 'number' ? String(m.value) : '—'),
    trend: toTrend(m.trend),
    context: str(m.context),
  }))
}

function toInsights(v: unknown): InsightItem[] {
  return recArr(v).map((i) => ({
    title: str(i.title, 'Insight'),
    description: str(i.description),
    impactScore: clamp(num(i.impactScore, 60), 0, 100),
    confidence: clamp(num(i.confidence, 70), 0, 100),
  }))
}

function toRecommendations(v: unknown): RecommendationItem[] {
  return recArr(v).map((r) => ({
    title: str(r.title, 'Recommendation'),
    description: str(r.description),
    priority: toPriority(r.priority),
    impact: str(r.impact, '—'),
    difficulty: toDifficulty(r.difficulty),
  }))
}

function toKeywords(v: unknown): KeywordRow[] {
  return recArr(v).map((k) => ({
    keyword: str(k.keyword, 'keyword'),
    cluster: str(k.cluster, '—'),
    intent: str(k.intent, '—'),
    volumeEstimate: str(k.volumeEstimate, typeof k.volumeEstimate === 'number' ? String(k.volumeEstimate) : '—'),
    difficulty: str(k.difficulty, typeof k.difficulty === 'number' ? String(k.difficulty) : '—'),
    opportunityScore: clamp(num(k.opportunityScore, 50), 0, 100),
  }))
}

function toArticles(v: unknown): ArticleIdea[] {
  return recArr(v).map((a) => ({
    title: str(a.title, 'Article idea'),
    summary: str(a.summary),
    relevanceScore: clamp(num(a.relevanceScore, 60), 0, 100),
    intent: str(a.intent, 'informational'),
    tags: strArr(a.tags),
  }))
}

function toChart(v: unknown): ChartDatum[] {
  return recArr(v).map((d) => ({ label: str(d.label, '—'), value: num(d.value) }))
}

function toPhases(v: unknown): TimelinePhase[] {
  return recArr(v).map((p) => ({ phase: str(p.phase, 'Phase'), actions: strArr(p.actions) }))
}

function toCitations(v: unknown): CitationItem[] {
  return recArr(v).map((c) => ({ source: str(c.source, 'Source'), url: str(c.url), note: str(c.note) }))
}

function shortlistToReport(obj: Record<string, unknown>): AgentReport | null {
  const primary = recArr(obj.primary)
  const secondary = recArr(obj.secondary)
  if (primary.length === 0 && secondary.length === 0) return null

  const rows = (items: Record<string, unknown>[], cluster: 'Primary' | 'Secondary'): KeywordRow[] =>
    items.map((k) => {
      const difficulty = num(k.difficulty)
      const volume = num(k.volume)
      return {
        keyword: str(k.keyword, 'keyword'),
        cluster,
        intent: cluster.toLowerCase(),
        volumeEstimate: `${volume.toLocaleString('en-US')}/mo`,
        difficulty: difficulty >= 60 ? 'high' : difficulty >= 30 ? 'medium' : 'low',
        opportunityScore: clamp(100 - difficulty, 5, 98),
      }
    })

  const keywords = [...rows(primary, 'Primary'), ...rows(secondary, 'Secondary')]
  const all = [...primary, ...secondary]
  const avgVolume = all.length > 0 ? Math.round(all.reduce((s, k) => s + num(k.volume), 0) / all.length) : 0
  const avgDifficulty = all.length > 0 ? Math.round(all.reduce((s, k) => s + num(k.difficulty), 0) / all.length) : 0

  const metrics: MetricItem[] = [
    { label: 'Primary keywords', value: String(primary.length), trend: 'flat', context: 'Distinct primary targets shortlisted' },
    { label: 'Secondary keywords', value: String(secondary.length), trend: 'flat', context: 'Supporting cluster keywords' },
    { label: 'Avg. est. volume', value: `${avgVolume.toLocaleString('en-US')}/mo`, trend: 'up', context: 'Average across the shortlist (estimate)' },
    { label: 'Avg. difficulty', value: String(avgDifficulty), trend: 'flat', context: '0-100 keyword difficulty (estimate)' },
  ]

  const insights: InsightItem[] = primary.map((k) => ({
    title: `Primary target: ${str(k.keyword, 'keyword')}`,
    description: str(k.reason, 'Selected by AI shortlisting for semantic alignment, intent fit and differentiation.'),
    impactScore: clamp(100 - num(k.difficulty), 5, 98),
    confidence: 82,
  }))

  const recommendations: RecommendationItem[] = primary.map((k) => {
    const difficulty = num(k.difficulty)
    const level: DifficultyLevel = difficulty >= 60 ? 'hard' : difficulty >= 30 ? 'medium' : 'easy'
    return {
      title: `Build pillar content for “${str(k.keyword, 'keyword')}”`,
      description: str(k.reason, 'Target this primary keyword with a dedicated page supported by the secondary cluster.'),
      priority: 'high' as PriorityLevel,
      impact: `~${num(k.volume).toLocaleString('en-US')} est. monthly searches`,
      difficulty: level,
    }
  })

  return {
    title: 'Keyword Shortlist',
    executiveSummary: `The autonomous 5-step keyword pipeline (query variants → SERP fetch → URL scoring → keyword pull → AI shortlisting) selected ${primary.length} primary and ${secondary.length} secondary keywords. Primary targets were chosen for semantic alignment, intent fit and distinct angles; secondary keywords support the topic cluster with a mix of head, mid-tail and long-tail terms. Volumes and difficulties are estimates.`,
    confidenceScore: 82,
    metrics,
    insights,
    recommendations,
    keywords,
    actionPlan: [],
    citations: [],
  }
}

function contentBriefToReport(obj: Record<string, unknown>): AgentReport | null {
  const sections = recArr(obj.sections)
  const bench = (
    typeof obj.wordCountBenchmark === 'object' && obj.wordCountBenchmark !== null && !Array.isArray(obj.wordCountBenchmark)
      ? obj.wordCountBenchmark
      : {}
  ) as Record<string, unknown>
  const semanticKeywords = strArr(obj.semanticKeywords)
  const contentGaps = strArr(obj.contentGaps)
  if (sections.length === 0 && semanticKeywords.length === 0 && contentGaps.length === 0) return null

  const metrics: MetricItem[] = [
    { label: 'Recommended length', value: `${num(bench.recommended).toLocaleString('en-US')} words`, trend: 'up', context: 'Target word count to compete (estimate)' },
    { label: 'Median top-10 length', value: `${num(bench.median).toLocaleString('en-US')} words`, trend: 'flat', context: 'Median across the ranking pages (estimate)' },
    { label: 'Word count range', value: `${num(bench.min).toLocaleString('en-US')}–${num(bench.max).toLocaleString('en-US')}`, trend: 'flat', context: 'Min–max of the top-ranking pages (estimate)' },
    { label: 'Content gaps found', value: String(contentGaps.length), trend: 'up', context: 'Topics/questions competitors answer that must be covered' },
  ]

  const insights: InsightItem[] = sections.map((s) => ({
    title: str(s.heading, 'Section'),
    description: `${str(s.notes, 'Cover this section thoroughly.')}${str(s.frequency) ? ` (${str(s.frequency)})` : ''}`,
    impactScore: 75,
    confidence: 78,
  }))

  const recommendations: RecommendationItem[] = contentGaps.map((gap) => ({
    title: gap.length > 80 ? `${gap.slice(0, 77)}…` : gap,
    description: 'Competitors do not fully answer this — address it explicitly in the article.',
    priority: 'high' as PriorityLevel,
    impact: 'Closes a competitive content gap',
    difficulty: 'medium' as DifficultyLevel,
  }))

  const keywords: KeywordRow[] = semanticKeywords.map((k) => ({
    keyword: k,
    cluster: 'Semantic / entity',
    intent: 'informational',
    volumeEstimate: '—',
    difficulty: '—',
    opportunityScore: 60,
  }))

  const actionPlan: TimelinePhase[] =
    sections.length > 0
      ? [{ phase: 'Recommended article structure', actions: sections.map((s) => str(s.heading, 'Section')) }]
      : []

  return {
    title: 'Content Research Brief',
    executiveSummary: `SERP analysis of the top-ranking pages produced ${sections.length} recommended sections, ${semanticKeywords.length} semantic keywords/entities and ${contentGaps.length} content gaps. Target roughly ${num(bench.recommended).toLocaleString('en-US')} words to be competitive with the current top results.`,
    confidenceScore: 80,
    metrics,
    insights,
    recommendations,
    keywords: keywords.length > 0 ? keywords : undefined,
    actionPlan,
    citations: [],
  }
}

function articleBriefToReport(obj: Record<string, unknown>): AgentReport | null {
  const outline = recArr(obj.outline)
  const faq = recArr(obj.faq)
  const h1 = str(obj.recommendedH1, 'Article Brief')
  const wordCountTarget = num(obj.wordCountTarget)
  if (outline.length === 0 && faq.length === 0) return null

  const metrics: MetricItem[] = [
    { label: 'Word count target', value: `${wordCountTarget.toLocaleString('en-US')} words`, trend: 'flat', context: 'Recommended article length (estimate)' },
    { label: 'Outline sections', value: String(outline.length), trend: 'flat', context: 'H2/H3 sections mapped to search intent' },
    { label: 'FAQ questions', value: String(faq.length), trend: 'up', context: 'Extracted from PAA / competitor patterns' },
  ]

  const insights: InsightItem[] = outline.map((s) => {
    const kws = strArr(s.keywords)
    return {
      title: `${str(s.level, 'H2')}: ${str(s.heading, 'Section')}`,
      description: `${str(s.instructions, 'Write this section per the brief.')}${kws.length > 0 ? ` Keywords: ${kws.join(', ')}.` : ''}`,
      impactScore: 76,
      confidence: 80,
    }
  })

  const recommendations: RecommendationItem[] = faq.map((f) => ({
    title: str(f.question, 'FAQ question'),
    description: str(f.answerGuidance, 'Answer concisely in the FAQ section.'),
    priority: 'medium' as PriorityLevel,
    impact: 'Captures PAA / FAQ visibility',
    difficulty: 'easy' as DifficultyLevel,
  }))

  const keywordRows: KeywordRow[] = outline.flatMap((s) =>
    strArr(s.keywords).map((k) => ({
      keyword: k,
      cluster: str(s.heading, 'Section'),
      intent: str(s.intent, 'informational'),
      volumeEstimate: '—',
      difficulty: '—',
      opportunityScore: 65,
    }))
  )

  const actionPlan: TimelinePhase[] =
    outline.length > 0
      ? [{ phase: 'Ready-to-write outline', actions: outline.map((s) => `${str(s.level, 'H2')}: ${str(s.heading, 'Section')}`) }]
      : []

  return {
    title: h1,
    executiveSummary: `Complete, ready-to-write article brief for “${h1}”. Target roughly ${wordCountTarget.toLocaleString('en-US')} words across ${outline.length} intent-mapped outline sections, with ${faq.length} FAQ questions extracted from PAA and competitor patterns. Each section carries writing instructions and assigned primary/secondary keywords.`,
    confidenceScore: 81,
    metrics,
    insights,
    recommendations,
    keywords: keywordRows.length > 0 ? keywordRows : undefined,
    actionPlan,
    citations: [],
  }
}

function normalizeReport(obj: Record<string, unknown>): AgentReport | null {
  if (typeof obj.title !== 'string' || typeof obj.executiveSummary !== 'string') return null
  const keywords = toKeywords(obj.keywords)
  const articles = toArticles(obj.articles)
  const intentDistribution = toChart(obj.intentDistribution)
  return {
    title: obj.title,
    executiveSummary: obj.executiveSummary,
    confidenceScore: clamp(num(obj.confidenceScore, 70), 0, 100),
    metrics: toMetrics(obj.metrics),
    insights: toInsights(obj.insights),
    recommendations: toRecommendations(obj.recommendations),
    keywords: keywords.length > 0 ? keywords : undefined,
    articles: articles.length > 0 ? articles : undefined,
    intentDistribution: intentDistribution.length > 0 ? intentDistribution : undefined,
    actionPlan: toPhases(obj.actionPlan),
    citations: toCitations(obj.citations),
  }
}

/**
 * Parses any agent output into the unified AgentReport used by the report UI.
 * Supports four shapes:
 * 1. Keyword Research shortlist (SP-2): { primary, secondary }
 * 2. Content Research brief (SP-3): { sections, wordCountBenchmark, semanticKeywords, contentGaps }
 * 3. Article Recommendation brief (SP-4): { recommendedH1, wordCountTarget, outline, faq }
 * 4. Legacy/direct AgentReport JSON (kept for existing execution history rows)
 */
export function parseAgentReport(output: string): AgentReport | null {
  let raw: unknown
  try {
    raw = JSON.parse(output)
  } catch {
    return null
  }
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null
  const obj = raw as Record<string, unknown>
  if (Array.isArray(obj.primary) || Array.isArray(obj.secondary)) return shortlistToReport(obj)
  if (Array.isArray(obj.sections) && typeof obj.wordCountBenchmark === 'object' && obj.wordCountBenchmark !== null) {
    return contentBriefToReport(obj)
  }
  if (typeof obj.recommendedH1 === 'string' && Array.isArray(obj.outline)) return articleBriefToReport(obj)
  return normalizeReport(obj)
}
