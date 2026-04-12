'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Moon, Cpu, Smartphone, Sun, Shield, type LucideIcon } from 'lucide-react'
import { EASING, FEATURES_DETAIL } from '@/lib/constants'

const ICON_MAP: Record<string, LucideIcon> = { Zap, Moon, Cpu, Smartphone, Sun, Shield }

export default function FeaturesDetail() {
  return (
    <section className="bg-[var(--cream)]">
      {FEATURES_DETAIL.map((f, i) => {
        const Icon = ICON_MAP[f.icon]
        const isEven = i % 2 === 0
        return (
          <div
            key={f.n}
            className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10 min-h-[320px]"
          >
            {/* Icon / number block */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASING.editorial }}
              viewport={{ once: true, margin: '-60px' }}
              className={`flex flex-col justify-between p-10 md:p-14 border-b md:border-b-0 border-[var(--text)] border-opacity-10 ${
                isEven ? 'md:border-r' : 'md:order-last md:border-l'
              }`}
            >
              <div>
                <span className="text-[9px] tracking-[0.2em] text-[var(--text)] opacity-20">{f.n}</span>
                <Icon size={28} strokeWidth={1.5} className="mt-5 text-[var(--text)] opacity-40" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] text-[var(--text)] tracking-tight mt-8">
                {f.title}
              </h2>
            </motion.div>

            {/* Content block */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASING.editorial, delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col justify-center p-10 md:p-14"
            >
              <p className="text-[13px] font-medium text-[var(--text)] mb-3 leading-snug">{f.lead}</p>
              <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8">{f.body}</p>
              <ul className="space-y-2">
                {f.detail.map(d => (
                  <li key={d} className="flex items-start gap-3 text-[10px] text-[var(--text)] opacity-40">
                    <span className="text-[var(--red)] mt-0.5 shrink-0">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )
      })}

      {/* Bottom CTA */}
      <div className="px-8 md:px-14 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[var(--text)] border-opacity-10">
        <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(24px,3vw,40px)] text-[var(--text)] leading-tight">
          Gotowy zobaczyć to<br /><em className="text-[var(--red)]">w akcji?</em>
        </p>
        <Link
          href="/pricing"
          className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-90 transition-opacity shrink-0"
        >
          Zobacz cennik →
        </Link>
      </div>
    </section>
  )
}
