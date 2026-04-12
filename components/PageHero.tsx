'use client'
import { motion } from 'framer-motion'
import { EASING } from '@/lib/constants'

interface PageHeroProps {
  eyebrow: string
  number: string
  title: string
  titleAccent: string
  subtitle?: string
}

export default function PageHero({ eyebrow, number, title, titleAccent, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-[var(--deep)] pt-32 pb-16 px-8 md:px-14 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,26,0,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6 text-[9px] uppercase tracking-[0.4em] text-[var(--cream)] opacity-40"
        >
          <span className="text-[var(--red)]">{number}</span>
          <span>{eyebrow}</span>
        </motion.div>
        <motion.h1
          initial={{ clipPath: 'inset(0 0 100% 0)', y: 12, opacity: 0 }}
          animate={{ clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING.editorial, delay: 0.15 }}
          className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-0.03em] text-[var(--cream)]"
        >
          {title}<br />
          <em className="text-[var(--red)]">{titleAccent}</em>
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-[12px] text-[var(--cream)] opacity-40 leading-relaxed max-w-[360px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--red)] opacity-20" />
    </section>
  )
}
