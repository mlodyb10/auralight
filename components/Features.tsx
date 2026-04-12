'use client'
import { motion } from 'framer-motion'
import { Zap, Moon, Cpu, Smartphone, Sun, Shield, type LucideIcon } from 'lucide-react'
import { FEATURES, EASING } from '@/lib/constants'

const ICONS: Record<string, LucideIcon> = { Zap, Moon, Cpu, Smartphone, Sun, Shield }

export default function Features() {
  return (
    <section id="features" className="bg-[var(--cream)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-8 md:px-14 pt-16 pb-8 border-b border-[var(--text)] border-opacity-10">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--red)] mb-3">
            <span className="text-[var(--text)] opacity-20 mr-3">03</span>
            Features
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-tight text-[var(--text)]">
            Everything light<br />
            <em className="text-[var(--red)]">should be.</em>
          </h2>
        </div>
        <p className="mt-6 md:mt-0 text-[11px] text-[var(--text)] opacity-40 leading-relaxed md:text-right md:max-w-[220px]">
          Sześć powodów, dla których Aura zmienia sposób w jaki myślisz o oświetleniu.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon]
          return (
            <motion.div
              key={f.n}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-60px' }}
              className="group relative p-8 border-r border-b border-[var(--text)] border-opacity-10 hover:bg-[#FF1A00]/[0.025] transition-colors duration-300 overflow-hidden"
            >
              {/* Neon border on hover — low opacity per spec */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[var(--border-neon)] transition-all duration-400 pointer-events-none" />

              <span className="block text-[9px] tracking-[0.2em] text-[var(--text)] opacity-20 mb-5">{f.n}</span>
              <Icon
                size={24}
                strokeWidth={1.5}
                className="text-[var(--text)] opacity-45 mb-5 group-hover:opacity-70 transition-opacity duration-300"
              />
              <h3 className="text-[13px] font-medium text-[var(--text)] mb-2 tracking-tight">{f.title}</h3>
              <p className="text-[10px] text-[var(--text)] opacity-40 leading-[1.7]">{f.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
