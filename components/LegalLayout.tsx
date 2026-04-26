'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export interface LegalSection {
  id: string
  number: string
  title: string
  content: string
}

export default function LegalLayout({ sections }: { sections: LegalSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = refs.current[id]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="flex min-h-[60vh]"
    >
      {/* Sticky TOC — desktop only */}
      <aside className="hidden md:block w-[220px] shrink-0 border-r border-[var(--red)] border-opacity-10">
        <div className="sticky top-[60px] px-5 py-8">
          <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-4">
            Spis treści
          </div>
          <nav className="flex flex-col gap-2.5">
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-[8px] leading-snug transition-all ${
                  activeId === id
                    ? 'text-[var(--cream)] opacity-90 pl-[10px] border-l border-[var(--red)]'
                    : 'text-[var(--cream)] opacity-30 pl-[11px] hover:opacity-60'
                }`}
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 px-7 md:px-10 py-8 max-w-2xl">
        {/* Mobile TOC — horizontal scroll pills */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 mb-6">
          {sections.map(({ id, number }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 text-[7px] uppercase tracking-[0.25em] px-3 py-1.5 border transition-all ${
                activeId === id
                  ? 'border-[var(--red)] text-[var(--red)]'
                  : 'border-[var(--cream)] border-opacity-20 text-[var(--cream)] opacity-40'
              }`}
            >
              {number}
            </a>
          ))}
        </div>

        {sections.map(({ id, number, title, content }, i) => (
          <div
            key={id}
            id={id}
            ref={el => { refs.current[id] = el }}
          >
            {i > 0 && <div className="h-px bg-[var(--red)] opacity-[0.08] my-8" />}
            <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-60 mb-1">
              {number}
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[18px] font-light text-[var(--cream)] mb-3">
              {title}
            </h2>
            <p className="text-[9px] text-[var(--cream)] opacity-45 leading-[1.8] whitespace-pre-line">
              {content}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
