import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getAllExecutions } from '@/lib/actions'
import AppShell from '@/components/AppShell'
import HistoryClient from '@/components/HistoryClient'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const executions = await getAllExecutions(user.id)
  return (
    <AppShell user={user} active="history">
      <HistoryClient executions={executions} />
    </AppShell>
  )
}
