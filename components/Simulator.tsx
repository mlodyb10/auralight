'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { EASING, COLORS } from '@/lib/constants'
import { useKelvinCrossfade } from '@/hooks/useKelvinCrossfade'

export default function Simulator() {
  const {
    sliderVal, hasInteracted, kelvinDisplay,
    neutralOpacity, warmOpacity, thumbColor, thumbShadow, kelvinColor,
    handleChange,
  } = useKelvinCrossfade(70)

  return (
    <section id="simulator" className="relative bg-[var(--black)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">

        {/* LEFT: Room visual */}
        <div className="relative overflow-hidden min-h-[300px] md:min-h-auto bg-black">
          <Image
            src="/room/salon/room-cool.jpg"
            alt="Room with cool daylight"
            fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover" priority
          />
          <motion.div className="absolute inset-0" style={{ opacity: neutralOpacity }}>
            <Image src="/room/salon/room-neutral.jpg" alt="Room neutral" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: warmOpacity }}>
            <Image src="/room/salon/room-warm.jpg" alt="Room warm" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </motion.div>
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
              <motion.em style={{ color: kelvinColor, fontStyle: 'italic' }}>
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
                onChange={handleChange}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-3"
                aria-label="Temperatura barwowa"
              />
              {!hasInteracted && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full pointer-events-none animate-ping bg-white/40"
                  style={{ left: `${sliderVal}%` }}
                />
              )}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/30 pointer-events-none"
                style={{ left: `${sliderVal}%`, x: '-50%', background: thumbColor, boxShadow: thumbShadow }}
              />
            </div>
            <motion.p
              className="mt-4 text-[11px] tracking-[0.1em] opacity-70"
              style={{ color: kelvinColor }}
              aria-live="polite"
              aria-atomic="true"
            >
              {kelvinDisplay}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
