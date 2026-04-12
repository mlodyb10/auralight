'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * On mount (and pathname change), if the URL has a hash,
 * scroll to it via Lenis once the page has painted.
 */
export default function HashScroller() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    // Wait two frames so the page has fully painted
    let raf: number
    const scroll = () => {
      const el = document.querySelector(hash)
      if (el) {
        window.__lenis?.scrollTo(el as HTMLElement, {
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          offset: -60, // nav height
        })
      }
    }
    raf = requestAnimationFrame(() => requestAnimationFrame(scroll))
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return null
}
