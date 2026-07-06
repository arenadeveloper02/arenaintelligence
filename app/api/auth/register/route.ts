import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createSession } from '@/lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { email?: string; password?: string; remember?: boolean }
    const email = (body.email ?? '').trim().toLowerCase()
    const password = body.password ?? ''
    const remember = body.remember ?? true

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'A valid email is required.' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in.' },
        { status: 409 }
      )
    }

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, passwordHash } })
    await createSession({ id: user.id, email: user.email }, remember)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
