'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EASING } from '@/lib/constants'

const PLANS = [
  {
    n: '01',
    name: 'Free',
    price: '€0',
    period: 'na zawsze',
    description: 'Idealne na start. Odkryj co potrafi inteligentne oświetlenie.',
    cta: 'Zacznij za darmo',
    ctaHref: '#',
    highlight: false,
    features: [
      '2 pomieszczenia',
      '5 scen świetlnych',
      'Podstawowy scheduler',
      'Aplikacja iOS / Android',
      'Integracja z Alexa',
    ],
  },
  {
    n: '02',
    name: 'Pro',
    price: '€12',
    period: 'miesięcznie',
    description: 'Dla tych którzy traktują przestrzeń poważnie.',
    cta: 'Zacznij 30-dniowy trial',
    ctaHref: '#',
    highlight: true,
    features: [
      'Nieograniczone pomieszczenia',
      'Nieograniczone sceny',
      'AI Scenes — uczenie maszynowe',
      'CPU Sync',
      'Night Mode zaawansowany',
      'HomeKit / Google Home / Alexa',
      'Priorytetowe wsparcie',
    ],
  },
  {
    n: '03',
    name: 'Enterprise',
    price: 'Custom',
    period: 'kontakt indywidualny',
    description: 'Dla przestrzeni komercyjnych, hoteli i deweloperów.',
    cta: 'Skontaktuj się',
    ctaHref: 'mailto:hello@aura.com',
    highlight: false,
    features: [
      'Wszystko z Pro',
      'Dostęp do API',
      'Własne integracje',
      'White-label opcja',
      'SLA 99.9%',
      'Dedykowany opiekun',
      'Onboarding i szkolenia',
    ],
  },
]

export default function PricingCards() {
  return (
    <section className="bg-[var(--cream)]">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[var(--text)] border-opacity-10">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.n}
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: EASING.editorial }}
            viewport={{ once: true, margin: '-40px' }}
            className={`relative flex flex-col p-10 md:p-12 border-r border-b md:border-b-0 border-[var(--text)] border-opacity-10 last:border-r-0 ${
              plan.highlight ? 'bg-[var(--text)]' : ''
            }`}
          >
            {/* Red top line on highlighted plan */}
            {plan.highlight && (
              <div className="absolute top-0 left-0 right-0 h-px bg-[var(--red)]" />
            )}

            {/* Header */}
            <div className="mb-8">
              <span
                className="text-[9px] tracking-[0.2em] opacity-25 block mb-3"
                style={{ color: plan.highlight ? 'var(--cream)' : 'var(--text)' }}
              >
                {plan.n}
              </span>
              <h2
                className="font-[family-name:var(--font-cormorant)] font-light text-[44px] leading-none tracking-tight mb-2"
                style={{ color: plan.highlight ? 'var(--cream)' : 'var(--text)' }}
              >
                {plan.name}
              </h2>
              {plan.highlight && (
                <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--red)] border border-[var(--red)] border-opacity-50 px-2 py-0.5">
                  Rekomendowany
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-opacity-10"
              style={{ borderColor: plan.highlight ? 'rgba(221,219,214,0.1)' : 'rgba(12,12,12,0.1)' }}>
              <div
                className="font-[family-name:var(--font-cormorant)] font-light text-[60px] leading-none tracking-tight"
                style={{ color: plan.highlight ? 'var(--cream)' : 'var(--text)' }}
              >
                {plan.price}
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.15em] mt-1 opacity-35"
                style={{ color: plan.highlight ? 'var(--cream)' : 'var(--text)' }}
              >
                {plan.period}
              </div>
            </div>

            {/* Description */}
            <p
              className="text-[11px] leading-relaxed mb-8 opacity-45"
              style={{ color: plan.highlight ? 'var(--cream)' : 'var(--text)' }}
            >
              {plan.description}
            </p>

            {/* Features list */}
            <ul className="space-y-3 mb-10 flex-1">
              {plan.features.map(f => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-[10px] leading-relaxed"
                  style={{ color: plan.highlight ? 'rgba(221,219,214,0.55)' : 'rgba(12,12,12,0.5)' }}
                >
                  <Check size={11} strokeWidth={2.5} className="shrink-0 mt-0.5" style={{ color: 'var(--red)' }} />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={plan.ctaHref}
              className={`block text-center text-[10px] uppercase tracking-[0.2em] py-3.5 px-6 transition-opacity hover:opacity-80 ${
                plan.highlight
                  ? 'bg-[var(--red)] text-white'
                  : 'border text-[var(--text)]'
              }`}
              style={
                plan.highlight
                  ? { boxShadow: '0 0 28px rgba(255,26,0,0.2)' }
                  : { borderColor: 'rgba(12,12,12,0.2)' }
              }
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>

      {/* FAQ row */}
      <div className="px-8 md:px-14 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-[var(--text)] border-opacity-10">
        {[
          { q: 'Czy mogę zmienić plan?',         a: 'Tak — upgrade i downgrade dostępny w dowolnym momencie. Rozliczenie proporcjonalne do dnia.' },
          { q: 'Jakie urządzenia obsługuje Aura?', a: 'Żarówki Zigbee, Z-Wave i Matter. Pełna lista kompatybilnych urządzeń dostępna w dokumentacji.' },
          { q: 'Co po 30-dniowym trialu?',        a: 'Automatycznie wracasz do planu Free. Żadnych opłat bez Twojej zgody.' },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="text-[11px] font-medium text-[var(--text)] mb-2">{q}</p>
            <p className="text-[10px] text-[var(--text)] opacity-40 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-8 md:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(22px,2.5vw,36px)] text-[var(--text)] leading-tight">
          Masz pytania?<br /><em className="text-[var(--red)]">Jesteśmy tu.</em>
        </p>
        <a
          href="mailto:hello@aura.com"
          className="text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity"
        >
          hello@aura.com →
        </a>
      </div>
    </section>
  )
}
