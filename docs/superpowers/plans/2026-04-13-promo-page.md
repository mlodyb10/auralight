# Aura /promo Campaign Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/promo` campaign landing page that captures early-access emails and demo signups, offering 30% off the Pro plan to the first 100 sign-ups.

**Architecture:** Next.js App Router page at `app/promo/page.tsx`. Server Actions in `app/promo/actions.ts` backed by Vercel KV. All UI components are Client Components following the existing Aura design system (Cormorant Garamond + Space Grotesk, CSS variables, Framer Motion v12). Existing `RoomImages` component from `RoomSimulator.tsx` is extracted and reused read-only in the simulator preview section.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, Framer Motion v12, `@vercel/kv`, React Server Actions — all except `@vercel/kv` already installed.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `app/promo/page.tsx` | Create | Server Component — fetches initial count, assembles all sections |
| `app/promo/actions.ts` | Create | Server Actions: `submitEmail`, `submitDemo`, `getEmailCount` |
| `components/PromoHero.tsx` | Create | Hero with animated counter + email capture form |
| `components/PromoDemo.tsx` | Create | Demo booking form (name + email) |
| `components/RoomSimulator.tsx` | Modify | Export `RoomImages` as named export so promo page can reuse it read-only |

---

## Task 1: Install @vercel/kv and write Server Actions

**Files:**
- Modify: `E:\projects\aura\package.json` (via npm install)
- Create: `E:\projects\aura\app\promo\actions.ts`

- [ ] **Step 1: Install @vercel/kv**

```bash
cd /e/projects/aura && npm install @vercel/kv
```

Expected: `@vercel/kv` appears in `package.json` dependencies. No errors.

- [ ] **Step 2: Create Server Actions file**

Create `E:\projects\aura\app\promo\actions.ts`:

```ts
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
```

- [ ] **Step 3: TypeScript check**

```bash
cd /e/projects/aura && npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors. If `@vercel/kv` types are missing, install `@types/vercel__kv` — though the package ships its own types.

- [ ] **Step 4: Commit**

```bash
cd /e/projects/aura && git add app/promo/actions.ts package.json package-lock.json && git commit -m "feat: add promo Server Actions backed by Vercel KV"
```

---

## Task 2: Export RoomImages from RoomSimulator

The Simulator Preview section in `/promo` reuses the existing `RoomImages` component. It currently lives inside `RoomSimulator.tsx` as a file-private function. We need to export it.

**Files:**
- Modify: `E:\projects\aura\components\RoomSimulator.tsx`

- [ ] **Step 1: Change `function RoomImages` to `export function RoomImages`**

In `E:\projects\aura\components\RoomSimulator.tsx`, line 16, change:

```tsx
function RoomImages({ roomId }: { roomId: string }) {
```

to:

```tsx
export function RoomImages({ roomId }: { roomId: string }) {
```

- [ ] **Step 2: Verify TypeScript still passes**

```bash
cd /e/projects/aura && npx tsc --noEmit 2>&1 | head -20
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
cd /e/projects/aura && git add components/RoomSimulator.tsx && git commit -m "feat: export RoomImages for reuse in promo page"
```

---

## Task 3: PromoHero component

**Files:**
- Create: `E:\projects\aura\components\PromoHero.tsx`

- [ ] **Step 1: Create PromoHero component**

Create `E:\projects\aura\components\PromoHero.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { EASING } from '@/lib/constants'
import { submitEmail } from '@/app/promo/actions'

interface PromoHeroProps {
  initialCount: number
}

export default function PromoHero({ initialCount }: PromoHeroProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const [displayCount, setDisplayCount] = useState(initialCount)
  const isClosed = initialCount >= 100

  // Animated counter — counts from 100 down to initialCount on mount
  const counterMv = useMotionValue(100)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isClosed) return
    const controls = animate(counterMv, initialCount, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: v => {
        setDisplayCount(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [initialCount, isClosed, counterMv])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const result = await submitEmail(email)
      if (result.success) {
        setSubmitted(true)
        setDisplayCount(result.count)
      } else {
        setError(result.error ?? 'Spróbuj ponownie.')
      }
    })
  }

  return (
    <section className="relative bg-[var(--deep)] pt-32 pb-20 px-8 md:px-14 overflow-hidden" id="promo-hero">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,26,0,0.09) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-5xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8 text-[9px] uppercase tracking-[0.4em] text-[var(--cream)] opacity-40"
        >
          <span className="text-[var(--red)]">01</span>
          <span>Oferta limitowana</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 12, opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING.editorial, delay: 0.15 }}
          className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-0.03em] text-[var(--cream)]"
        >
          Światło które<br />
          <em className="text-[var(--red)]">zmienia wszystko.</em>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-[12px] text-[var(--cream)] opacity-40 leading-relaxed max-w-[400px]"
        >
          Pierwsze 100 osób otrzymuje 30% zniżki na plan Pro. Na zawsze.
        </motion.p>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex items-baseline gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            ref={counterRef}
            className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(36px,5vw,64px)] text-[var(--red)] leading-none tabular-nums"
          >
            {isClosed ? '100' : displayCount}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-30">
            / 100 miejsc zajętych
          </span>
        </motion.div>

        {/* Form or closed state */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            {isClosed ? (
              <motion.p
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-40"
              >
                Lista zamknięta.
              </motion.p>
            ) : submitted ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASING.editorial }}
                className="text-[12px] text-[var(--cream)] opacity-70"
              >
                Jesteś na liście ✓
              </motion.p>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-[480px]"
              >
                <input
                  type="email"
                  required
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={isPending}
                  className="flex-1 bg-white/5 border border-white/10 text-[var(--cream)] text-[11px] tracking-[0.05em] placeholder:text-white/20 px-4 py-3 outline-none focus-visible:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-[var(--red)] text-white text-[10px] uppercase tracking-[0.2em] px-7 py-3 hover:opacity-90 disabled:opacity-50 transition-opacity shrink-0"
                >
                  {isPending ? '...' : 'Zgarnij zniżkę →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {error && (
            <p className="mt-2 text-[10px] text-[var(--red)] opacity-70">{error}</p>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--red)] opacity-20" />
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /e/projects/aura && npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
cd /e/projects/aura && git add components/PromoHero.tsx && git commit -m "feat: add PromoHero with animated counter and email form"
```

---

## Task 4: PromoDemo component

**Files:**
- Create: `E:\projects\aura\components\PromoDemo.tsx`

- [ ] **Step 1: Create PromoDemo component**

Create `E:\projects\aura\components\PromoDemo.tsx`:

```tsx
'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING } from '@/lib/constants'
import { submitDemo } from '@/app/promo/actions'

export default function PromoDemo() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const result = await submitDemo(name, email)
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error ?? 'Spróbuj ponownie.')
      }
    })
  }

  return (
    <section className="bg-[var(--cream)] border-t border-[var(--text)] border-opacity-10">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* Headline block */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASING.editorial }}
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col justify-center p-10 md:p-14 border-b md:border-b-0 md:border-r border-[var(--text)] border-opacity-10"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 mb-6 block">
            05 — Demo
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,56px)] leading-[0.95] tracking-tight text-[var(--text)]">
            Chcesz zobaczyć<br />
            <em className="text-[var(--red)]">to u siebie?</em>
          </h2>
          <p className="mt-5 text-[11px] text-[var(--text)] opacity-40 leading-relaxed max-w-[300px]">
            Umów bezpłatne demo — pokażemy jak Aura działa w Twoim wnętrzu.
          </p>
        </motion.div>

        {/* Form block */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASING.editorial, delay: 0.1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col justify-center p-10 md:p-14"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASING.editorial }}
              >
                <p className="text-[13px] text-[var(--text)] leading-relaxed">
                  Dziękujemy, {name}. ✓<br />
                  <span className="opacity-50 text-[11px]">Odezwiemy się na {email} w ciągu 24h.</span>
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-[400px]"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-[var(--text)] opacity-30">
                    Imię
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    placeholder="Jan"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent border-b border-[var(--text)] border-opacity-20 text-[var(--text)] text-[11px] tracking-[0.05em] placeholder:text-[var(--text)] placeholder:opacity-20 py-2 outline-none focus-visible:border-opacity-60 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-[var(--text)] opacity-30">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jan@firma.pl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent border-b border-[var(--text)] border-opacity-20 text-[var(--text)] text-[11px] tracking-[0.05em] placeholder:text-[var(--text)] placeholder:opacity-20 py-2 outline-none focus-visible:border-opacity-60 transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-[10px] text-[var(--red)] opacity-70">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 self-start bg-[var(--text)] text-[var(--cream)] text-[10px] uppercase tracking-[0.2em] px-8 py-3.5 hover:opacity-80 disabled:opacity-40 transition-opacity"
                >
                  {isPending ? '...' : 'Umów demo →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /e/projects/aura && npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
cd /e/projects/aura && git add components/PromoDemo.tsx && git commit -m "feat: add PromoDemo form component"
```

---

## Task 5: Assemble the /promo page

**Files:**
- Create: `E:\projects\aura\app\promo\page.tsx`

This page is a Server Component. It fetches the initial email count and passes it to `PromoHero`. All other sections are inline or composed from existing/new components.

**Note on Vercel KV in dev:** `@vercel/kv` requires `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars. In local dev these will be missing, so `getEmailCount()` will throw. Wrap it in a try/catch and default to 0.

- [ ] **Step 1: Create the page**

Create `E:\projects\aura\app\promo\page.tsx`:

```tsx
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PromoHero from '@/components/PromoHero'
import PromoDemo from '@/components/PromoDemo'
import { RoomImages } from '@/components/RoomSimulator'
import { getEmailCount } from '@/app/promo/actions'

export const metadata = {
  title: 'Oferta limitowana — Aura',
  description: 'Pierwsze 100 osób otrzymuje 30% zniżki na plan Pro. Na zawsze.',
}

export default async function PromoPage() {
  let initialCount = 0
  try {
    initialCount = await getEmailCount()
  } catch {
    // KV not configured locally — default to 0
  }

  return (
    <main>
      {/* 1. Hero */}
      <PromoHero initialCount={initialCount} />

      {/* 2. Lifestyle section */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10">
        {/* Image */}
        <div className="relative min-h-[400px] overflow-hidden">
          <Image
            src="/room/salon/room-warm.jpg"
            alt="Salon w ciepłym oświetleniu"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            className="object-cover"
          />
        </div>
        {/* Copy */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-[var(--cream)]">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 mb-6 block">
            02 — Dom
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] tracking-tight text-[var(--text)] mb-6">
            Twój dom.<br /><em className="text-[var(--red)]">Twój nastrój.</em>
          </h2>
          <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8 max-w-[320px]">
            Poranna energia, wieczorny relaks, romantyczna kolacja — Aura zmienia atmosferę jednym dotknięciem.
            Twórz niepowtarzalne chwile w przestrzeni, którą kochasz.
          </p>
          <a
            href="#promo-hero"
            className="self-start text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity"
          >
            Zgarnij zniżkę →
          </a>
        </div>
      </section>

      {/* 3. Work section */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10">
        {/* Copy — left on desktop */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-[var(--cream)] order-2 md:order-1">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 mb-6 block">
            03 — Praca
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] tracking-tight text-[var(--text)] mb-6">
            Produktywność<br /><em className="text-[var(--red)]">zaczyna się od światła.</em>
          </h2>
          <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8 max-w-[320px]">
            CPU Sync monitoruje Twoje skupienie i automatycznie przełącza na chłodne, ostre światło podczas
            głębokiej pracy. Przerwa? Ciepłe przyciemnienie samo się włącza.
          </p>
          <a
            href="#promo-hero"
            className="self-start text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity"
          >
            Zgarnij zniżkę →
          </a>
        </div>
        {/* Image — right on desktop */}
        <div className="relative min-h-[400px] overflow-hidden order-1 md:order-2">
          <Image
            src="/room/salon/room-cool.jpg"
            alt="Przestrzeń do pracy w chłodnym oświetleniu"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            className="object-cover"
          />
        </div>
      </section>

      {/* 4. Simulator preview */}
      <section className="bg-[var(--cream)] border-b border-[var(--text)] border-opacity-10">
        <div className="px-8 md:px-14 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--text)] border-opacity-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 block mb-2">
              04 — Symulator
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(28px,3.5vw,48px)] leading-[0.95] text-[var(--text)]">
              Zobacz różnicę <em className="text-[var(--red)]">sam.</em>
            </h2>
          </div>
          <Link
            href="/simulator"
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity shrink-0"
          >
            Pełny symulator →
          </Link>
        </div>
        <RoomImages roomId="salon" />
      </section>

      {/* 5. Demo form */}
      <PromoDemo />
    </main>
  )
}
```

- [ ] **Step 2: TypeScript check**

```bash
cd /e/projects/aura && npx tsc --noEmit 2>&1 | head -30
```

Expected: 0 errors.

- [ ] **Step 3: Production build**

```bash
cd /e/projects/aura && npm run build 2>&1 | tail -30
```

Expected: `/promo` listed as a route. No errors. If you see `KV_REST_API_URL` errors — that's expected in local build without the env var; the try/catch in `page.tsx` should absorb it.

- [ ] **Step 4: Commit**

```bash
cd /e/projects/aura && git add app/promo/ && git commit -m "feat: add /promo campaign landing page"
```

---

## Task 6: Push and deploy

- [ ] **Step 1: Push to GitHub**

```bash
cd /e/projects/aura && git push origin master
```

Vercel auto-deploys on push. Wait ~60 seconds for deployment.

- [ ] **Step 2: Verify deployment**

Open `https://auralight.vercel.app/promo` in a browser. Confirm:
- Hero renders with counter animation
- Email form visible (not "Lista zamknięta")
- Lifestyle and Work sections show room images
- Simulator preview is interactive (slider works)
- Demo form is visible

**Note:** Email/demo submissions will fail with a 500 until Vercel KV is configured. See setup below.

- [ ] **Step 3: Set up Vercel KV (manual step — user action required)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard) → your `auralight` project → **Storage** tab
2. Click **Connect Store** → **KV** → **Create New**
3. Name: `aura-promo`, region closest to you → Create
4. Vercel automatically adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` to your project env vars
5. Redeploy: `vercel --prod` or push an empty commit:
   ```bash
   cd /e/projects/aura && git commit --allow-empty -m "chore: trigger redeploy after KV setup" && git push origin master
   ```

After this, form submissions will persist in Vercel KV and can be viewed in the Vercel dashboard under Storage → your KV database → Data Browser.
