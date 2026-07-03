import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, decryptApiKey } from '@/lib/auth'
import { AGENTS, buildPrompt } from '@/lib/agents'
import type { AgentSlug } from '@/lib/types'

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
  }
  try {
    const body = (await request.json()) as { agent?: string; inputs?: Record<string, string> }
    const agent = body.agent
    const inputs = body.inputs ?? {}
    if (!agent || !(agent in AGENTS)) {
      return NextResponse.json({ success: false, error: 'Unknown agent.' }, { status: 400 })
    }
    const slug = agent as AgentSlug
    const config = AGENTS[slug]
    for (const field of config.fields) {
      if (field.required && !(inputs[field.name] ?? '').trim()) {
        return NextResponse.json({ success: false, error: `${field.label} is required.` }, { status: 400 })
      }
    }
    const setting = await prisma.setting.findUnique({ where: { userId: user.id } })
    const apiKey = setting?.openaiApiKey ? decryptApiKey(setting.openaiApiKey) : null
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Connect your OpenAI API key to start using AI agents.' },
        { status: 400 }
      )
    }
    const prompt = buildPrompt(slug, inputs)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content:
              'You are Arena Planner AI, an expert SEO and content strategy assistant. Respond with clear, well-structured markdown.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) {
      const message =
        response.status === 401
          ? 'Your OpenAI API key was rejected. Update it in Settings.'
          : `OpenAI request failed (status ${response.status}). Please try again.`
      return NextResponse.json({ success: false, error: message }, { status: 502 })
    }
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const output = data.choices?.[0]?.message?.content ?? ''
    if (!output) {
      return NextResponse.json({ success: false, error: 'OpenAI returned an empty response.' }, { status: 502 })
    }
    const execution = await prisma.execution.create({
      data: { userId: user.id, agentName: slug, input: JSON.stringify(inputs), output },
    })
    return NextResponse.json({
      success: true,
      output,
      execution: {
        id: execution.id,
        agentName: execution.agentName,
        input: execution.input,
        output: execution.output,
        createdAt: execution.createdAt.toISOString(),
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Agent execution failed. Please try again.' }, { status: 500 })
  }
}
