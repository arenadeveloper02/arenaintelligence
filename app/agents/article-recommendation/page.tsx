import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getAgentExecutions, getHasApiKey } from '@/lib/actions'
import { AGENTS } from '@/lib/agents'
import AppShell from '@/components/AppShell'
import AgentRunnerClient from '@/components/AgentRunnerClient'

export const dynamic = 'force-dynamic'

export default async function ArticleRecommendationPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const [hasApiKey, executions] = await Promise.all([
    getHasApiKey(user.id),
    getAgentExecutions(user.id, 'article-recommendation'),
  ])
  return (
    <AppShell user={user} active="article-recommendation">
      <AgentRunnerClient agent={AGENTS['article-recommendation']} hasApiKey={hasApiKey} executions={executions} />
    </AppShell>
  )
}
