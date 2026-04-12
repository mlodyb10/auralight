'use client'
import { motion } from 'framer-motion'
import { useScrollGlow } from '@/hooks/useScrollGlow'
import { EASING } from '@/lib/constants'

const words = ['Light', 'that']
const italicWord = 'understands'
const lastWord = 'you.'

export default function Hero() {
  const { blob1Y, blob2Y, blob1Opacity } = useScrollGlow()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  }

  const wordVariant = {
    hidden: { clipPath: 'inset(0 0 100% 0)', y: 10, opacity: 0 },
    visible: {
      clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
      transition: { duration: 0.7, ease: EASING.editorial },
    },
  }

  return (
    <section className="relative min-h-screen bg-[var(--deep)] flex flex-col justify-end pb-16 px-8 md:px-14 pt-24 overflow-hidden">
      {/* Remotion video background */}
      <video
        src="/aura-loop.mp4"
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
      />

      {/* Scroll-reactive glow blobs */}
      <motion.div
        className="absolute top-[25%] left-[12%] w-[420px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,26,0,0.14) 0%, transparent 70%)',
          filter: 'blur(55px)',
          y: blob1Y,
          opacity: blob1Opacity,
        }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[10%] w-[320px] h-[220px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,140,50,0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
          y: blob2Y,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-3 mb-6 text-[9px] uppercase tracking-[0.4em] text-[var(--cream)] opacity-40"
        >
          <span className="text-[var(--red)]">01</span>
          <span>AI-powered lighting</span>
        </motion.div>

        {/* Headline — staggered word reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="font-[family-name:var(--font-cormorant)] font-light leading-[0.92] tracking-[-0.03em] text-[clamp(52px,7.5vw,100px)] text-[var(--cream)]"
        >
          <div className="flex flex-wrap gap-x-[0.2em]">
            {words.map(w => (
              <span key={w} className="overflow-hidden inline-block">
                <motion.span variants={wordVariant} className="inline-block">{w}</motion.span>
              </span>
            ))}
          </div>
          <div className="overflow-hidden inline-block">
            <motion.span variants={wordVariant} className="inline-block italic text-[var(--red)]">
              {italicWord}
            </motion.span>
          </div>
          <br />
          <div className="overflow-hidden inline-block">
            <motion.span variants={wordVariant} className="inline-block">{lastWord}</motion.span>
          </div>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-10 gap-6"
        >
          <p className="text-[12px] text-[var(--cream)] opacity-40 leading-[1.75] max-w-[300px]">
            Inteligentne oświetlenie które czyta Twój nastrój.<br />
            Żadnych przełączników. Tylko intuicja.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#simulator"
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-40 border-b border-current pb-px hover:opacity-70 transition-opacity"
            >
              ↓ Zobacz jak działa
            </a>
            <a
              href="#cta"
              className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Get Aura
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom editorial line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--red)] opacity-20" />
    </section>
  )
}
