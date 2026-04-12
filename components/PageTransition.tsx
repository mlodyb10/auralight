'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { EASING } from '@/lib/constants'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0.1 : 0.35, ease: EASING.editorial }}
    >
      {children}
    </motion.div>
  )
}
