'use client'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { EASING, COLORS } from '@/lib/constants'

export default function Simulator() {
  const [sliderVal, setSliderVal] = useState(70) // 0=cool, 100=warm

  const warmth = useMotionValue(70)

  useEffect(() => {
    animate(warmth, sliderVal, { duration: 0.6, ease: EASING.editorial })
  }, [sliderVal, warmth])

  const warmOverlayOpacity = useTransform(warmth, [0, 100], [0, 0.55])
  const coolOverlayOpacity = useTransform(warmth, [0, 100], [0.45, 0])

  // Room background shifts from cool dark to warm dark
  const bgR = useTransform(warmth, [0, 100], [8, 20])
  const bgG = useTransform(warmth, [0, 100], [8, 8])
  const bgB = useTransform(warmth, [0, 100], [22, 8])

  // Kelvin label
  const kelvin = useTransform(warmth, [0, 100], [6500, 2700])
  const [kelvinDisplay, setKelvinDisplay] = useState('2700 K — Warm Amber')

  useEffect(() => {
    const unsub = kelvin.on('change', v => {
      const k = Math.round(v / 100) * 100
      const label = k > 5000 ? 'Cool Daylight' : k > 3500 ? 'Neutral White' : 'Warm Amber'
      setKelvinDisplay(`${k} K — ${label}`)
    })
    return unsub
  }, [kelvin])

  return (
    <section id="simulator" className="relative bg-[var(--black)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* LEFT: Room visual (CSS fallback — replace with Image when Nano Banana images available) */}
        <div className="relative overflow-hidden min-h-[300px] md:min-h-auto">
          {/* Base room — stylized architectural SVG */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: useTransform(
                warmth,
                [0, 100],
                ['rgb(8,8,22)', 'rgb(20,8,4)']
              ),
            }}
          />

          {/* Architectural room SVG illustration */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 600 500"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Back wall */}
            <polygon points="100,80 500,80 500,380 100,380" fill="rgba(221,219,214,0.03)" stroke="rgba(221,219,214,0.06)" strokeWidth="0.5"/>
            {/* Left wall */}
            <polygon points="0,0 100,80 100,380 0,500" fill="rgba(221,219,214,0.02)" stroke="rgba(221,219,214,0.05)" strokeWidth="0.5"/>
            {/* Floor */}
            <polygon points="0,500 100,380 500,380 600,500" fill="rgba(221,219,214,0.02)" stroke="rgba(221,219,214,0.04)" strokeWidth="0.5"/>
            {/* Ceiling */}
            <polygon points="0,0 600,0 500,80 100,80" fill="rgba(221,219,214,0.015)"/>
            {/* Sofa */}
            <rect x="160" y="290" width="280" height="80" rx="4" fill="rgba(221,219,214,0.05)" stroke="rgba(221,219,214,0.08)" strokeWidth="0.5"/>
            <rect x="160" y="270" width="280" height="25" rx="3" fill="rgba(221,219,214,0.07)"/>
            <rect x="155" y="268" width="20" height="102" rx="3" fill="rgba(221,219,214,0.07)"/>
            <rect x="425" y="268" width="20" height="102" rx="3" fill="rgba(221,219,214,0.07)"/>
            {/* Ceiling light fixture */}
            <line x1="300" y1="0" x2="300" y2="70" stroke="rgba(221,219,214,0.15)" strokeWidth="1"/>
            <ellipse cx="300" cy="72" rx="14" ry="6" fill="rgba(221,219,214,0.2)"/>
            {/* Window */}
            <rect x="140" y="110" width="100" height="140" fill="rgba(74,120,200,0.06)" stroke="rgba(221,219,214,0.08)" strokeWidth="0.5"/>
            <line x1="190" y1="110" x2="190" y2="250" stroke="rgba(221,219,214,0.06)" strokeWidth="0.5"/>
          </svg>

          {/* Cool blue overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 25%, rgba(74,158,255,0.65) 0%, rgba(100,160,255,0.25) 50%, transparent 80%)',
              opacity: coolOverlayOpacity,
              mixBlendMode: 'screen',
            }}
          />
          {/* Warm amber overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 20%, rgba(255,150,50,0.8) 0%, rgba(255,100,20,0.35) 50%, transparent 80%)',
              opacity: warmOverlayOpacity,
              mixBlendMode: 'screen',
            }}
          />
          {/* Floor glow reflection */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16 pointer-events-none"
            style={{
              background: useTransform(
                warmth,
                [0, 100],
                ['radial-gradient(ellipse, rgba(74,158,255,0.15) 0%, transparent 70%)',
                 'radial-gradient(ellipse, rgba(255,140,50,0.2) 0%, transparent 70%)']
              ),
              filter: 'blur(12px)',
            }}
          />

          {/* Nano Banana notice */}
          <div className="absolute bottom-3 left-3 text-[8px] uppercase tracking-[0.15em] text-[var(--cream)] opacity-20">
            Replace with AI photo ↑
          </div>
        </div>

        {/* RIGHT: Controls */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING.editorial }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col justify-between px-10 py-14 border-l border-[var(--cream)] border-opacity-[0.05]"
        >
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--red)] mb-5">
              <span className="text-[var(--cream)] opacity-20 mr-3">02</span>
              Room Simulator
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-tight text-[var(--cream)]">
              Poczuj<br />
              <motion.em
                style={{
                  color: useTransform(warmth, [0, 100], [COLORS.cool, COLORS.warm]),
                  fontStyle: 'italic',
                }}
              >
                różnicę.
              </motion.em>
            </h2>
            <p className="mt-4 text-[11px] text-[var(--cream)] opacity-40 leading-relaxed max-w-[280px]">
              Przesuń suwak i obserwuj jak zmienia się nastrój pomieszczenia — od chłodnej koncentracji po ciepły relaks.
            </p>
          </div>

          <div className="mt-10">
            <div className="flex justify-between mb-3">
              <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--cream)] opacity-30">Cool 6500K</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--cream)] opacity-30">Warm 2700K</span>
            </div>
            <div className="relative">
              <div
                className="w-full h-px"
                style={{ background: `linear-gradient(90deg, ${COLORS.cool}, ${COLORS.warm})` }}
              />
              <input
                type="range" min={0} max={100} value={sliderVal}
                onChange={e => setSliderVal(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-3"
                aria-label="Temperatura barwowa"
              />
              {/* Custom thumb */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/30 pointer-events-none"
                style={{
                  left: `${sliderVal}%`,
                  x: '-50%',
                  background: useTransform(warmth, [0, 100], [COLORS.cool, COLORS.warm]),
                  boxShadow: useTransform(
                    warmth,
                    [0, 100],
                    [`0 0 10px ${COLORS.cool}80`, `0 0 10px ${COLORS.warm}80`]
                  ),
                }}
              />
            </div>
            <motion.p
              className="mt-4 text-[11px] tracking-[0.1em] opacity-70"
              style={{ color: useTransform(warmth, [0, 100], [COLORS.cool, COLORS.warm]) }}
            >
              {kelvinDisplay}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
