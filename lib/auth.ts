import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import type { SessionUser } from '@/lib/types'

const AUTH_SECRET = process.env.AUTH_SECRET ?? 'arena-planner-ai-dev-secret-change-in-production'
const COOKIE_NAME = 'arena_session'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createSession(user: SessionUser, remember: boolean): Promise<void> {
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24
  const token = jwt.sign({ id: user.id, email: user.email }, AUTH_SECRET, { expiresIn: maxAge })
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const payload = jwt.verify(token, AUTH_SECRET) as { id: string; email: string }
    return { id: payload.id, email: payload.email }
  } catch {
    return null
  }
}

function getEncryptionKey(): Buffer {
  return createHash('sha256').update(process.env.ENCRYPTION_SECRET ?? AUTH_SECRET).digest()
}

export function encryptApiKey(plain: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', getEncryptionKey(), iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
}

export function decryptApiKey(payload: string): string | null {
  try {
    const [ivHex, tagHex, dataHex] = payload.split(':')
    if (!ivHex || !tagHex || !dataHex) return null
    const decipher = createDecipheriv('aes-256-gcm', getEncryptionKey(), Buffer.from(ivHex, 'hex'))
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()])
    return decrypted.toString('utf8')
  } catch {
    return null
  }
}

export function maskApiKey(plain: string): string {
  if (plain.length <= 9) return '••••••••'
  return `${plain.slice(0, 5)}••••••••${plain.slice(-4)}`
}
