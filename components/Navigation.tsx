'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { EASING } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Features',  href: '/features' },
  { label: 'Simulator', href: '/simulator' },
  { label: 'Pricing',   href: '/pricing' },
]

export default function Navigation() {
  const { scrollY } = useScroll()
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function isActive(href: string) {
    return pathname === href
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-8 h-[60px] flex items-center"
        style={{ backdropFilter: 'blur(16px)', background: 'rgba(221,219,214,0.75)' }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'var(--border-neon)', opacity: borderOpacity }}
        />

        <Link href="/" className="font-[family-name:var(--font-cormorant)] text-xl font-light tracking-[0.4em] text-[var(--text)] hover:opacity-70 transition-opacity">
          AURA
        </Link>

        <div className="ml-auto flex items-center gap-7">
          {/* Desktop links */}
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href)
            return (
              <Link
                key={label}
                href={href}
                className={`hidden sm:block text-[10px] uppercase tracking-[0.2em] transition-opacity ${
                  active
                    ? 'text-[var(--text)] opacity-100'
                    : 'text-[var(--text)] opacity-50 hover:opacity-100'
                }`}
              >
                {label}
                {active && (
                  <motion.div
                    layoutId="nav-underline"
                    className="h-px bg-[var(--text)] mt-0.5"
                    transition={{ duration: 0.3, ease: EASING.editorial }}
                  />
                )}
              </Link>
            )
          })}

          <Link
            href="/pricing"
            className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-[var(--red)] border-b border-[var(--red)] pb-px"
          >
            Get Aura
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="sm:hidden flex flex-col justify-center gap-[5px] w-6 h-6 relative z-50"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px bg-[var(--text)] w-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px bg-[var(--text)] w-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-px bg-[var(--text)] w-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASING.editorial }}
            className="fixed inset-0 z-40 flex flex-col pt-[60px]"
            style={{ background: 'rgba(221,219,214,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <nav className="flex flex-col px-8 pt-10 gap-0">
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = isActive(href)
                return (
                  <motion.div key={label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.35, ease: EASING.editorial }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-[family-name:var(--font-cormorant)] font-light text-[clamp(36px,8vw,52px)] leading-tight border-b border-[var(--text)] border-opacity-10 py-5 ${
                        active ? 'text-[var(--text)]' : 'text-[var(--text)] opacity-40'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mr-3 font-[family-name:var(--font-space)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.07, duration: 0.35, ease: EASING.editorial }}
                className="mt-10 self-start"
              >
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 block"
                >
                  Get Aura
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
