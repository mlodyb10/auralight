'use client'
import { motion } from 'framer-motion'
import { Player } from '@remotion/player'
import { AuraShowcase } from '@/remotion/AuraShowcase'
import { EASING } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section id="cta" className="relative bg-[var(--deep)] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[440px]">

        {/* LEFT: Remotion Player */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING.editorial }}
          viewport={{ once: true, margin: '-80px' }}
          className="relative flex items-center justify-center p-10 border-r border-[var(--cream)] border-opacity-[0.05]"
        >
          {/* Subtle glow behind player */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,26,0,0.06) 0%, transparent 70%)' }}
          />
          <div className="w-full max-w-[480px] overflow-hidden relative z-10">
            <Player
              component={AuraShowcase}
              durationInFrames={180}
              fps={30}
              compositionWidth={800}
              compositionHeight={500}
              style={{ width: '100%', aspectRatio: '8/5' }}
              autoPlay
              loop
              controls={false}
            />
          </div>
        </motion.div>

        {/* RIGHT: Copy */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASING.editorial, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col justify-between px-10 py-14"
        >
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--red)] mb-5">
              <span className="text-[var(--cream)] opacity-20 mr-3">04</span>
              Get Aura
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(34px,4.5vw,56px)] leading-[0.95] text-[var(--cream)]">
              Gotowy na<br />
              <em className="text-[var(--red)]">nowe</em> światło?
            </h2>
            <p className="mt-5 text-[11px] text-[var(--cream)] opacity-35 leading-relaxed max-w-[280px]">
              Dołącz do tysięcy osób, które zmieniły sposób doświadczania własnej przestrzeni.
            </p>
          </div>
          <div className="mt-10">
            <a
              href="#"
              className="inline-block text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 0 36px rgba(255,26,0,0.3)' }}
            >
              Get Aura — Early Access
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
