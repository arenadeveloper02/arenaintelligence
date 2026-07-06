import { NextResponse, after } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { processJob, recoverStaleJobs } from '@/lib/jobs'
import type { NotificationData, NotificationType } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Keep the invocation alive long enough for the after() background executor
// to finish recovered long-running agent calls, independent of the browser.
export const maxDuration = 60

function toNotificationData(n: {
  id: string
  type: string
  category: string
  title: string
  message: string
  read: boolean
  agentSlug: string | null
  executionId: string | null
  createdAt: Date
}): NotificationData {
  const type: NotificationType =
    n.type === 'success' || n.type === 'warning' || n.type === 'error' ? n.type : 'info'
  return {
    id: n.id,
    type,
    category: n.category,
    title: n.title,
    message: n.message,
    read: n.read,
    agentSlug: n.agentSlug,
    executionId: n.executionId,
    createdAt: n.createdAt.toISOString(),
  }
}

export async function GET(): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ notifications: [], unreadCount: 0 }, { status: 401 })
  }
  try {
    // Self-healing: notification polling happens on every authenticated page,
    // so use it to re-dispatch any stale queued/running jobs whose executor
    // was interrupted. This keeps agent execution alive across navigation,
    // refreshes and closed tabs.
    const staleIds = await recoverStaleJobs(user.id)
    if (staleIds.length > 0) {
      after(async () => {
        for (const jobId of staleIds) {
          await processJob(jobId)
        }
      })
    }

    const [rows, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      prisma.notification.count({ where: { userId: user.id, read: false } }),
    ])
    return NextResponse.json({ notifications: rows.map(toNotificationData), unreadCount })
  } catch {
    return NextResponse.json({ notifications: [], unreadCount: 0 }, { status: 500 })
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as {
      type?: string
      category?: string
      title?: string
      message?: string
      agentSlug?: string
      executionId?: string
    }
    const title = (body.title ?? '').trim().slice(0, 140)
    const message = (body.message ?? '').trim().slice(0, 400)
    if (!title || !message) {
      return NextResponse.json({ success: false, error: 'Title and message are required.' }, { status: 400 })
    }
    const type =
      body.type === 'success' || body.type === 'info' || body.type === 'warning' || body.type === 'error'
        ? body.type
        : 'info'
    const category = (body.category ?? 'General').trim().slice(0, 60) || 'General'
    const created = await prisma.notification.create({
      data: {
        userId: user.id,
        type,
        category,
        title,
        message,
        agentSlug: body.agentSlug ? body.agentSlug.slice(0, 60) : null,
        executionId: body.executionId ? body.executionId.slice(0, 60) : null,
      },
    })
    return NextResponse.json({ success: true, notification: toNotificationData(created) })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to create notification.' }, { status: 500 })
  }
}

export async function DELETE(): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    await prisma.notification.deleteMany({ where: { userId: user.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to clear notifications.' }, { status: 500 })
  }
}
