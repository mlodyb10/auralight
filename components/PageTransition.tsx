'use client'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { EASING } from '@/lib/constants'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduce ? 0 : -8 }}
        transition={{ duration: shouldReduce ? 0.1 : 0.45, ease: EASING.editorial }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
