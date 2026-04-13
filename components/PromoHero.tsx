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
