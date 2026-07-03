import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getAgentExecutions, getHasApiKey } from '@/lib/actions'
import { AGENTS } from '@/lib/agents'
import AppShell from '@/components/AppShell'
import AgentRunnerClient from '@/components/AgentRunnerClient'

export const dynamic = 'force-dynamic'

export default async function KeywordResearchPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const [hasApiKey, executions] = await Promise.all([
    getHasApiKey(user.id),
    getAgentExecutions(user.id, 'keyword-research'),
  ])
  return (
    <AppShell user={user} active="keyword-research">
      <AgentRunnerClient agent={AGENTS['keyword-research']} hasApiKey={hasApiKey} executions={executions} />
    </AppShell>
  )
}
