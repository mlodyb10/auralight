'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import { EASING } from '@/lib/constants'

const KEYFRAMES = [
  { pos: 0,   label: 'Focus Mode' },
  { pos: 0.5, label: 'Balanced'   },
  { pos: 1,   label: 'Relax Mode' },
]

function warmthToKelvin(w: number) {
  return Math.round(6500 + (2700 - 6500) * w)
}

function warmthToLabel(w: number) {
  if (w < 0.33) return 'Focus Mode'
  if (w < 0.66) return 'Balanced'
  return 'Relax Mode'
}

export default function KelvinDisplay() {
  const warmth = useMotionValue<number>(0)
  const [kelvin, setKelvin] = useState(6500)
  const [label, setLabel]   = useState('Focus Mode')
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    return warmth.on('change', v => {
      setKelvin(warmthToKelvin(v))
      setLabel(warmthToLabel(v))
    })
  }, [warmth])

  useEffect(() => {
    if (shouldReduce) {
      warmth.set(0.5)
      return
    }

    let cancelled = false
    let currentControls: AnimationPlaybackControls | null = null

    const sequence = async () => {
      while (!cancelled) {
        for (const kf of KEYFRAMES) {
          if (cancelled) break
          currentControls = animate(warmth, kf.pos, { duration: 2.2, ease: EASING.editorial })
          await (currentControls as unknown as Promise<void>)
          if (cancelled) break
          await new Promise<void>(res => { loopRef.current = setTimeout(res, 1400) })
        }
        if (!cancelled) {
          currentControls = animate(warmth, 0, { duration: 3, ease: EASING.editorial })
          await (currentControls as unknown as Promise<void>)
          if (cancelled) break
          await new Promise<void>(res => { loopRef.current = setTimeout(res, 800) })
        }
      }
    }
    sequence()
    return () => {
      cancelled = true
      currentControls?.stop()
      if (loopRef.current) clearTimeout(loopRef.current)
    }
  }, [warmth, shouldReduce])

  const r = useTransform(warmth, [0, 1], [74,  255])
  const g = useTransform(warmth, [0, 1], [158, 140])
  const b = useTransform(warmth, [0, 1], [255,  50])

  const accentColor = useTransform(
    [r, g, b] as [typeof r, typeof g, typeof b],
    ([rv, gv, bv]) => `rgb(${Math.round(rv as number)},${Math.round(gv as number)},${Math.round(bv as number)})`
  )
  const glowBg = useTransform(
    [r, g, b] as [typeof r, typeof g, typeof b],
    ([rv, gv, bv]) => `radial-gradient(ellipse at 50% 40%, rgba(${Math.round(rv as number)},${Math.round(gv as number)},${Math.round(bv as number)},0.12) 0%, transparent 70%)`
  )
  const dotShadow  = useTransform(accentColor, c => `0 0 10px ${c}`)
  const fillBg     = useTransform(accentColor, c => `linear-gradient(90deg, rgb(74,158,255), ${c})`)
  const spectrumPct = useTransform(warmth, [0, 1], ['0%', '100%'])

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10 select-none">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg, filter: 'blur(40px)' }}
      />

      <motion.div
        className="relative text-center mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASING.editorial }}
      >
        <div
          className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(72px,9vw,120px)] leading-none tracking-tight text-[var(--cream)] min-w-[4ch] text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {kelvin.toLocaleString()}
        </div>
        <div className="text-[9px] uppercase tracking-[0.5em] text-[var(--cream)] opacity-20 mt-1">
          Kelvin
        </div>
      </motion.div>

      <div className="relative h-5 mb-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            className="absolute text-[9px] uppercase tracking-[0.5em]"
            style={{ color: accentColor, fontFamily: 'var(--font-space)' }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-[360px]">
        <div className="flex justify-between mb-2">
          <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20">6500 K</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20">2700 K</span>
        </div>
        <div className="relative h-px w-full" style={{ background: 'linear-gradient(90deg, rgb(74,158,255), rgb(255,220,160) 50%, rgb(255,140,50))' }}>
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
            style={{ left: spectrumPct, x: '-50%', background: accentColor, boxShadow: dotShadow }}
          />
        </div>
        <motion.div
          className="h-px mt-[-1px] opacity-60"
          style={{ width: spectrumPct, background: fillBg }}
        />
      </div>
    </div>
  )
}
