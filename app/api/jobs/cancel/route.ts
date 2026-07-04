import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as { id?: string }
    const id = typeof body.id === 'string' && body.id.length > 0 ? body.id : ''
    if (!id) {
      return NextResponse.json({ success: false, error: 'Job id is required.' }, { status: 400 })
    }
    await prisma.agentJob.updateMany({
      where: { id, userId: user.id, status: { in: ['queued', 'running'] } },
      data: { status: 'cancelled', step: 'Cancelled', completedAt: new Date() },
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to cancel the job.' }, { status: 500 })
  }
}
