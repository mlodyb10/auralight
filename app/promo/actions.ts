'use server'

import { kv } from '@vercel/kv'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function getEmailCount(): Promise<number> {
  const count = await kv.get<number>('email:count')
  return count ?? 0
}

export async function submitEmail(
  email: string
): Promise<{ success: boolean; count: number; error?: string }> {
  const trimmed = email.trim()
  if (!isValidEmail(trimmed)) {
    return { success: false, count: 0, error: 'Nieprawidłowy adres email.' }
  }

  let newCount: number
  try {
    newCount = await kv.incr('email:count')
    if (newCount > 100) {
      await kv.decr('email:count')
      return { success: false, count: 100, error: 'Lista jest już zamknięta.' }
    }
    await kv.set(`email:${crypto.randomUUID()}`, {
      email: trimmed,
      source: 'promo-hero',
      createdAt: new Date().toISOString(),
    })
  } catch {
    return { success: false, count: 0, error: 'Błąd serwera. Spróbuj ponownie.' }
  }

  return { success: true, count: newCount }
}

export async function submitDemo(
  name: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()

  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    return { success: false, error: 'Imię musi mieć od 2 do 100 znaków.' }
  }
  if (!isValidEmail(trimmedEmail)) {
    return { success: false, error: 'Nieprawidłowy adres email.' }
  }

  try {
    await kv.set(`demo:${crypto.randomUUID()}`, {
      name: trimmedName,
      email: trimmedEmail,
      createdAt: new Date().toISOString(),
    })
  } catch {
    return { success: false, error: 'Błąd serwera. Spróbuj ponownie.' }
  }

  return { success: true }
}
