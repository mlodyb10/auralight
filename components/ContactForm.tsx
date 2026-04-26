'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING } from '@/lib/constants'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="grid md:grid-cols-[220px_1fr] min-h-[420px]">
      {/* Left — contact info */}
      <div className="border-r border-[var(--red)] border-opacity-10 px-7 md:px-5 py-8 md:py-10">
        <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-4">Kontakt</div>
        <div className="text-[9px] text-[var(--cream)] opacity-50 leading-[1.8] mb-8">
          hello@aura.pl<br />
          Warszawa, Polska
        </div>
        <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-3">Social</div>
        <div className="text-[9px] text-[var(--cream)] opacity-35 leading-[1.8]">
          Instagram<br />
          LinkedIn<br />
          GitHub
        </div>
        <p className="mt-10 text-[9px] text-[var(--cream)] opacity-20 italic font-[family-name:var(--font-cormorant)] leading-snug">
          &ldquo;Każde pytanie<br />jest dobre.&rdquo;
        </p>
      </div>

      {/* Right — form / success */}
      <div className="px-7 md:px-10 py-8 md:py-10">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.editorial }}
              className="flex flex-col justify-center h-full min-h-[280px]"
            >
              <div className="text-[7px] uppercase tracking-[0.4em] text-[var(--red)] opacity-60 mb-4">Wysłano</div>
              <p className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,4vw,40px)] font-light text-[var(--cream)] leading-[1.1]">
                Dziękujemy.<br />
                <em className="text-[var(--red)]">Odezwiemy się wkrótce.</em>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <FormField label="Imię i nazwisko" name="name" type="text" placeholder="Jan Kowalski" required />
                <FormField label="Adres email" name="email" type="email" placeholder="jan@example.com" required />
              </div>
              <div className="mb-6">
                <FormField label="Temat" name="subject" type="text" placeholder="Pytanie o produkt" required />
              </div>
              <div className="mb-8">
                <FormTextarea label="Wiadomość" name="message" placeholder="Napisz coś..." required />
              </div>
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  className="text-[9px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-80 transition-opacity"
                >
                  Wyślij wiadomość
                </button>
                <span className="text-[8px] text-[var(--cream)] opacity-20">Żadnego spamu. Nigdy.</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FormField({ label, name, type, placeholder, required }: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[7px] uppercase tracking-[0.25em] text-[var(--cream)] opacity-35 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-[var(--cream)] border-opacity-15 pb-2 text-[9px] text-[var(--cream)] placeholder:opacity-20 focus:outline-none focus:border-opacity-40 transition-all"
      />
    </div>
  )
}

function FormTextarea({ label, name, placeholder, required }: {
  label: string
  name: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[7px] uppercase tracking-[0.25em] text-[var(--cream)] opacity-35 mb-2">
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full bg-transparent border-b border-[var(--cream)] border-opacity-15 pb-2 text-[9px] text-[var(--cream)] placeholder:opacity-20 focus:outline-none focus:border-opacity-40 transition-all resize-none"
      />
    </div>
  )
}
