import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getDashboardData } from '@/lib/actions'
import AppShell from '@/components/AppShell'
import { DashboardClient } from '@/components/DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const data = await getDashboardData(user.id)
  return (
    <AppShell user={user} active="dashboard">
      <DashboardClient user={user} data={data} />
    </AppShell>
  )
}
