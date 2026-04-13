# Aura /promo Campaign Landing Page — Design Spec

## Goal

A dedicated campaign landing page at `/promo` that captures emails (early access waitlist) and demo signups, offering 30% off the Pro plan to the first 100 sign-ups. Targets two segments simultaneously: lifestyle (homeowners) and work-from-home professionals.

## Architecture

Next.js App Router page at `app/promo/page.tsx`. Server Actions in `app/promo/actions.ts` backed by Vercel KV. All UI components are Client Components following existing Aura design system (Cormorant Garamond + Space Grotesk, CSS variables, Framer Motion v12).

---

## Page Structure

Six sections rendered in order:

### 1. Hero
- Dark background (`--deep`)
- Eyebrow: `01 — Oferta limitowana`
- Headline (Cormorant, large): `Światło które` / *`zmienia wszystko.`* (red italic)
- Subtext: `Pierwsze 100 osób otrzymuje 30% zniżki na plan Pro. Na zawsze.`
- Animated counter: `XX/100 miejsc` — counts down from 100 to current value over 1.2s on mount using Framer Motion `useMotionValue` + `animate`
- Single email input + CTA button: `Zgarnij zniżkę →`
- On success: AnimatePresence swaps form → `Jesteś na liście ✓` confirmation
- If count ≥ 100: form hidden, replaced with `Lista zamknięta.`

### 2. Lifestyle Section
- Two-column grid (image left, copy right)
- Image: `/public/room/salon/room-warm.jpg`
- Headline: `Twój dom. Twój nastrój.`
- Body: Short copy targeting homeowners — atmosphere, relaxation, personalisation
- CTA: scroll to hero form

### 3. Work Section
- Two-column grid reversed (copy left, image right)
- Image: `/public/room/salon/room-cool.jpg`
- Headline: `Produktywność zaczyna się od światła.`
- Body: Short copy targeting WFH professionals — focus, CPU Sync, cool light
- CTA: scroll to hero form

### 4. Room Simulator Preview
- Reuses existing `RoomImages` component (salon, read-only slider interaction)
- Section headline: `Zobacz różnicę sam.`
- Link to full simulator: `/simulator`

### 5. Demo Form
- Separate section with light cream background
- Headline: `Chcesz zobaczyć to u siebie?` / *`Umów bezpłatne demo.`*
- Fields: imię + email
- CTA button: `Umów demo →`
- On success: AnimatePresence swap → confirmation message

### 6. Footer
- Identical to rest of site (already in layout — no changes needed)

---

## Backend

**File:** `app/promo/actions.ts`

### `submitEmail(email: string)`
- Validates email format
- Saves to Vercel KV: key `email:<timestamp>`, value `{ email, source: 'promo-hero', createdAt: ISO string }`
- Returns `{ success: boolean, count: number }` — count used to update the displayed counter

### `submitDemo(name: string, email: string)`
- Validates name + email
- Saves to Vercel KV: key `demo:<timestamp>`, value `{ name, email, createdAt: ISO string }`
- Returns `{ success: boolean }`

### `getEmailCount()`
- Fetches `kv.keys('email:*')` and returns length
- Called at page render (Server Component) to seed the initial counter value

**Vercel KV setup:**
1. Vercel Dashboard → Storage → KV → Create Database
2. Environment variable `KV_URL` auto-added to project
3. Install: `npm install @vercel/kv`

---

## Animations

| Element | Animation |
|---|---|
| Hero headline | clipPath reveal + stagger (same as Hero.tsx) |
| Counter | `useMotionValue` counting down from 100 → actual value, 1.2s ease-out |
| Form success | `AnimatePresence mode="wait"` — form exits, confirmation enters |
| Section reveals | `whileInView` opacity + y (same as FeaturesDetail.tsx) |

---

## Files

| File | Action |
|---|---|
| `app/promo/page.tsx` | New — Server Component, fetches count, renders sections |
| `app/promo/actions.ts` | New — two Server Actions |
| `components/PromoHero.tsx` | New — hero with counter + email form |
| `components/PromoDemo.tsx` | New — demo booking form |

Existing components reused without modification: `RoomImages` (from RoomSimulator.tsx), `PageHero` (not used — custom hero instead), `Footer` (via layout).

---

## Out of Scope

- Payment processing
- Email confirmation / transactional emails
- Admin dashboard (use Vercel KV dashboard to view submissions)
- Static creatives and Remotion video ad (separate projects)
