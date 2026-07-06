import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createSession } from '@/lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { email?: string; password?: string; remember?: boolean }
    const email = (body.email ?? '').trim().toLowerCase()
    const password = body.password ?? ''
    const remember = body.remember ?? true

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 })
    }

    await createSession({ id: user.id, email: user.email }, remember)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Sign in failed. Please try again.' }, { status: 500 })
  }
}
