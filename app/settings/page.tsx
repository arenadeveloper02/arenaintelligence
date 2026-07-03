import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getApiKeyStatus } from '@/lib/actions'
import AppShell from '@/components/AppShell'
import SettingsClient from '@/components/SettingsClient'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const status = await getApiKeyStatus(user.id)
  return (
    <AppShell user={user} active="settings">
      <SettingsClient user={user} status={status} />
    </AppShell>
  )
}
