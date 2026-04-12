'use client'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navigation() {
  const { scrollY } = useScroll()
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-8 h-[60px] flex items-center"
      style={{ backdropFilter: 'blur(16px)', background: 'rgba(221,219,214,0.75)' }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--border-neon)', opacity: borderOpacity }}
      />

      <span className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-[0.4em] text-[var(--text)]">
        AURA
      </span>

      <div className="ml-auto flex items-center gap-7">
        {['Features', 'Simulator', 'Pricing'].map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-[var(--text)] opacity-50 hover:opacity-100 transition-opacity"
          >
            {link}
          </a>
        ))}
        <a
          href="#cta"
          className="text-[10px] uppercase tracking-[0.2em] text-[var(--red)] border-b border-[var(--red)] pb-px"
        >
          Get Aura
        </a>
      </div>
    </motion.nav>
  )
}
