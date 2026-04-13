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
