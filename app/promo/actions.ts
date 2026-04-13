'use server'

import { kv } from '@vercel/kv'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function getEmailCount(): Promise<number> {
  const keys = await kv.keys('email:*')
  return keys.length
}

export async function submitEmail(
  email: string
): Promise<{ success: boolean; count: number; error?: string }> {
  const trimmed = email.trim()
  if (!isValidEmail(trimmed)) {
    return { success: false, count: 0, error: 'Nieprawidłowy adres email.' }
  }

  const count = await getEmailCount()
  if (count >= 100) {
    return { success: false, count, error: 'Lista jest już zamknięta.' }
  }

  await kv.set(`email:${Date.now()}`, {
    email: trimmed,
    source: 'promo-hero',
    createdAt: new Date().toISOString(),
  })

  const newCount = await getEmailCount()
  return { success: true, count: newCount }
}

export async function submitDemo(
  name: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()

  if (!trimmedName || trimmedName.length < 2) {
    return { success: false, error: 'Imię musi mieć co najmniej 2 znaki.' }
  }
  if (!isValidEmail(trimmedEmail)) {
    return { success: false, error: 'Nieprawidłowy adres email.' }
  }

  await kv.set(`demo:${Date.now()}`, {
    name: trimmedName,
    email: trimmedEmail,
    createdAt: new Date().toISOString(),
  })

  return { success: true }
}
