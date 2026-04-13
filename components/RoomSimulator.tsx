'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING, COLORS } from '@/lib/constants'
import { useKelvinCrossfade } from '@/hooks/useKelvinCrossfade'

const ROOMS = [
  { id: 'salon',     label: 'Salon',    n: '01', ready: true  },
  { id: 'sypialnia', label: 'Sypialnia', n: '02', ready: true  },
  { id: 'kuchnia',   label: 'Kuchnia',  n: '03', ready: true  },
  { id: 'lazienka',  label: 'Łazienka', n: '04', ready: true  },
]

export function RoomImages({ roomId }: { roomId: string }) {
  const {
    warmth, sliderVal, hasInteracted, kelvinDisplay,
    neutralOpacity, warmOpacity, thumbColor, thumbShadow, kelvinColor,
    handleChange,
  } = useKelvinCrossfade(50)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
      {/* Image panel */}
      <div className="relative overflow-hidden min-h-[320px] md:min-h-auto bg-black">
        <Image
          src={`/room/${roomId}/room-cool.jpg`}
          alt="Room cool"
          fill sizes="(max-width: 768px) 100vw, 50vw" quality={90} className="object-cover" priority
        />
        <motion.div className="absolute inset-0" style={{ opacity: neutralOpacity }}>
          <Image src={`/room/${roomId}/room-neutral.jpg`} alt="Room neutral" fill sizes="(max-width: 768px) 100vw, 50vw" quality={90} className="object-cover" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: warmOpacity }}>
          <Image src={`/room/${roomId}/room-warm.jpg`} alt="Room warm" fill sizes="(max-width: 768px) 100vw, 50vw" quality={90} className="object-cover" />
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-col justify-between px-10 py-14 border-l border-[var(--text)] border-opacity-[0.06]">
        <div>
          <p className="text-[11px] text-[var(--text)] opacity-40 leading-relaxed max-w-[300px]">
            Przesuń suwak i obserwuj jak zmienia się nastrój — od chłodnej koncentracji po ciepły relaks.
          </p>
        </div>
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text)] opacity-30">Cool 6500K</span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--text)] opacity-30">Warm 2700K</span>
          </div>
          <div className="relative">
            <div className="w-full h-px" style={{ background: `linear-gradient(90deg, ${COLORS.cool}, ${COLORS.warm})` }} />
            <input
              type="range" min={0} max={100} value={sliderVal}
              onChange={handleChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-6 -top-3"
              aria-label="Temperatura barwowa"
            />
            {!hasInteracted && (
              <span
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full pointer-events-none animate-ping bg-black/30"
                style={{ left: `${sliderVal}%` }}
              />
            )}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-black/20 pointer-events-none"
              style={{ left: `${sliderVal}%`, x: '-50%', background: thumbColor, boxShadow: thumbShadow }}
            />
          </div>
          <motion.p
            className="mt-4 text-[11px] tracking-[0.1em] opacity-60"
            style={{ color: kelvinColor }}
            aria-live="polite"
            aria-atomic="true"
          >
            {kelvinDisplay}
          </motion.p>
        </div>
      </div>
    </div>
  )
}

function PlaceholderRoom({ room }: { room: typeof ROOMS[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]">
      <div className="relative overflow-hidden min-h-[320px] md:min-h-auto bg-[var(--text)] flex flex-col items-center justify-center gap-4 p-12">
        <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--cream)] opacity-20">{room.n}</span>
        <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(28px,3vw,40px)] text-[var(--cream)] opacity-30 text-center">
          {room.label}
        </p>
        <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--red)] opacity-60 text-center">
          Zdjęcia wkrótce
        </p>
      </div>
      <div className="flex flex-col justify-center px-10 py-14 border-l border-[var(--text)] border-opacity-[0.06]">
        <p className="text-[11px] text-[var(--text)] opacity-30 leading-relaxed max-w-[280px]">
          Pracujemy nad tym pomieszczeniem. Wróć wkrótce.
        </p>
      </div>
    </div>
  )
}

export default function RoomSimulator() {
  const [activeRoomId, setActiveRoomId] = useState('salon')
  const room = ROOMS.find(r => r.id === activeRoomId)!

  return (
    <section className="bg-[var(--cream)]">
      {/* Room selector tabs */}
      <div className="border-b border-[var(--text)] border-opacity-10">
        <div className="flex overflow-x-auto">
          {ROOMS.map((r, i) => (
            <motion.button
              key={r.id}
              onClick={() => setActiveRoomId(r.id)}
              className={`relative flex-shrink-0 flex items-center gap-3 px-8 py-5 text-[10px] uppercase tracking-[0.2em] transition-opacity border-r border-[var(--text)] border-opacity-10 last:border-r-0 ${
                activeRoomId === r.id
                  ? 'text-[var(--text)]'
                  : 'text-[var(--text)] opacity-35 hover:opacity-60'
              }`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: EASING.editorial }}
            >
              <span className="text-[8px] tracking-[0.2em] text-[var(--red)] opacity-70">{r.n}</span>
              {r.label}
              {!r.ready && (
                <span className="text-[7px] uppercase tracking-[0.1em] text-[var(--text)] opacity-25 ml-1">soon</span>
              )}
              {activeRoomId === r.id && (
                <motion.div
                  layoutId="room-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[var(--text)]"
                  transition={{ duration: 0.3, ease: EASING.editorial }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Room content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeRoomId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASING.editorial }}
        >
          {room.ready
            ? <RoomImages roomId={room.id} />
            : <PlaceholderRoom room={room} />
          }
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="px-8 md:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[var(--text)] border-opacity-10">
        <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(22px,2.5vw,36px)] text-[var(--text)] leading-tight">
          Chcesz to u siebie?<br /><em className="text-[var(--red)]">Zacznij za darmo.</em>
        </p>
        <Link
          href="/pricing"
          className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-90 transition-opacity shrink-0"
        >
          Zobacz cennik →
        </Link>
      </div>
    </section>
  )
}
