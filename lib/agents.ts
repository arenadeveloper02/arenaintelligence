import type { AgentConfig, AgentSlug } from '@/lib/types'

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

export function buildPrompt(slug: AgentSlug, inputs: Record<string, string>): string {
  if (slug === 'keyword-research') {
    return [
      'Perform comprehensive SEO keyword research.',
      '',
      `Seed keyword: ${inputs.seedKeyword ?? ''}`,
      `Target country: ${inputs.country ?? ''}`,
      `Target language: ${inputs.language ?? ''}`,
      `Industry: ${inputs.industry ?? ''}`,
      '',
      'Deliver the following sections:',
      '1. Keyword Clusters — 5 clusters with 5 keywords each.',
      '2. Search Intent Classification — classify every cluster as informational, navigational, transactional or commercial.',
      '3. Long-tail Keywords — 10 long-tail variations with estimated difficulty (low/medium/high).',
      '4. Content Opportunities — 5 opportunities, each with an opportunity score from 0-100 and a short rationale.',
      '5. Keyword Table — a CSV-formatted table with the columns: keyword,cluster,intent,opportunity_score.',
    ].join('\n')
  }
  if (slug === 'content-research') {
    return [
      'Perform in-depth content research.',
      '',
      `Topic: ${inputs.topic ?? ''}`,
      `Industry: ${inputs.industry ?? ''}`,
      `Competitor URLs: ${inputs.competitorUrls ?? 'none provided'}`,
      '',
      'Deliver the following sections:',
      '1. Research Report — key findings and market context for this topic.',
      '2. Content Gaps — gaps competitors are likely missing.',
      '3. Questions Users Ask — 10 FAQ questions with brief answers.',
      '4. Content Clusters — pillar topic plus supporting cluster topics.',
      '5. Recommended Headings — a complete article outline with H1, H2 and H3 headings.',
    ].join('\n')
  }
  return [
    'Recommend high-impact articles and a publishing plan.',
    '',
    `Topic: ${inputs.topic ?? ''}`,
    `Keywords: ${inputs.keywords ?? ''}`,
    `Industry: ${inputs.industry ?? ''}`,
    '',
    'Deliver the following sections:',
    '1. Article Ideas — 8 ideas, each with a content score from 0-100.',
    '2. Suggested Titles — 3 title variations for the top 3 ideas.',
    '3. Trending Topics — 5 trending angles worth covering now.',
    '4. Content Calendar — a 4-week publishing plan with cadence.',
    '5. Publishing Recommendations — related resources and internal linking tips.',
  ].join('\n')
}
