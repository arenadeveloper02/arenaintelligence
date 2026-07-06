import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, decryptApiKey } from '@/lib/auth'
import { AGENTS, buildPrompt, parseAgentReport, SYSTEM_PROMPT } from '@/lib/agents'
import type { AgentSlug } from '@/lib/types'

async function createNotification(
  userId: string,
  type: 'success' | 'info' | 'warning' | 'error',
  category: string,
  title: string,
  message: string,
  agentSlug?: string,
  executionId?: string
): Promise<void> {
  try {
    await prisma.notification.create({
      data: {
        userId,
        type,
        category,
        title,
        message,
        agentSlug: agentSlug ?? null,
        executionId: executionId ?? null,
      },
    })
  } catch {
    // Notification failures must never break agent execution
  }
}

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
    await createNotification(
      user.id,
      'info',
      'Agent Execution',
      `${config.name} started`,
      `${config.name} has started processing your request.`,
      slug
    )
    const prompt = buildPrompt(slug, inputs)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.5,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
      }),
    })
    if (!response.ok) {
      const message =
        response.status === 401
          ? 'Your OpenAI API key was rejected. Update it in Settings.'
          : `OpenAI request failed (status ${response.status}). Please try again.`
      await createNotification(
        user.id,
        'error',
        'Agent Execution',
        `${config.name} failed`,
        message,
        slug
      )
      return NextResponse.json({ success: false, error: message }, { status: 502 })
    }
    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] }
    const output = data.choices?.[0]?.message?.content ?? ''
    if (!output) {
      await createNotification(
        user.id,
        'error',
        'Agent Execution',
        `${config.name} failed`,
        'OpenAI returned an empty response. Please run the agent again.',
        slug
      )
      return NextResponse.json({ success: false, error: 'OpenAI returned an empty response.' }, { status: 502 })
    }
    const report = parseAgentReport(output)
    if (!report) {
      await createNotification(
        user.id,
        'error',
        'Agent Execution',
        `${config.name} failed`,
        'The AI returned an invalid report structure. Please run the agent again.',
        slug
      )
      return NextResponse.json(
        { success: false, error: 'The AI returned an invalid report structure.' },
        { status: 502 }
      )
    }
    const execution = await prisma.execution.create({
      data: {
        userId: user.id,
        agentName: slug,
        input: JSON.stringify(inputs),
        output,
      },
    })
    await createNotification(
      user.id,
      'success',
      'Agent Execution',
      `${config.name} completed`,
      `${config.name} completed successfully. Your report is ready to view.`,
      slug,
      execution.id
    )
    return NextResponse.json({
      success: true,
      executionId: execution.id,
      output,
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Agent execution failed. Please try again.' },
      { status: 500 }
    )
  }
}
