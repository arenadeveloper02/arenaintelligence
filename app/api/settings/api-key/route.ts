import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, encryptApiKey, maskApiKey } from '@/lib/auth'

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as { apiKey?: string }
    const apiKey = body.apiKey?.trim()
    if (!apiKey || !apiKey.startsWith('sk-')) {
      return NextResponse.json(
        { success: false, error: 'Enter a valid OpenAI API key starting with sk-.' },
        { status: 400 }
      )
    }
    const encrypted = encryptApiKey(apiKey)
    await prisma.setting.upsert({
      where: { userId: user.id },
      update: { openaiApiKey: encrypted },
      create: { userId: user.id, openaiApiKey: encrypted },
    })
    return NextResponse.json({ success: true, maskedKey: maskApiKey(apiKey) })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save API key. Please try again.' },
      { status: 500 }
    )
  }
}
