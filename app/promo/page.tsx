import Link from 'next/link'
import Image from 'next/image'
import PromoHero from '@/components/PromoHero'
import PromoDemo from '@/components/PromoDemo'
import { RoomImages } from '@/components/RoomSimulator'
import { getEmailCount } from '@/app/promo/actions'

export const metadata = {
  title: 'Oferta limitowana — Aura',
  description: 'Pierwsze 100 osób otrzymuje 30% zniżki na plan Pro. Na zawsze.',
}

export default async function PromoPage() {
  let initialCount = 0
  try {
    initialCount = await getEmailCount()
  } catch {
    // KV not configured locally — default to 0
  }

  return (
    <main>
      {/* 1. Hero */}
      <PromoHero initialCount={initialCount} />

      {/* 2. Lifestyle section */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10">
        {/* Image */}
        <div className="relative min-h-[400px] overflow-hidden">
          <Image
            src="/room/kuchnia/room-warm.jpg"
            alt="Kuchnia w ciepłym oświetleniu"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            className="object-cover"
          />
        </div>
        {/* Copy */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-[var(--cream)]">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 mb-6 block">
            02 — Dom
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] tracking-tight text-[var(--text)] mb-6">
            Twój dom.<br /><em className="text-[var(--warm)]">Twój nastrój.</em>
          </h2>
          <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8 max-w-[320px]">
            Poranna energia, wieczorny relaks, romantyczna kolacja — Aura zmienia atmosferę jednym dotknięciem.
            Twórz niepowtarzalne chwile w przestrzeni, którą kochasz.
          </p>
          <a
            href="#promo-hero"
            className="self-start text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity"
          >
            Zgarnij zniżkę →
          </a>
        </div>
      </section>

      {/* 3. Work section */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10">
        {/* Copy — left on desktop */}
        <div className="flex flex-col justify-center p-10 md:p-14 bg-[var(--cream)] order-2 md:order-1">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 mb-6 block">
            03 — Praca
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] tracking-tight text-[var(--text)] mb-6">
            Produktywność<br /><em className="text-[var(--cool)]">zaczyna się od światła.</em>
          </h2>
          <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8 max-w-[320px]">
            CPU Sync monitoruje Twoje skupienie i automatycznie przełącza na chłodne, ostre światło podczas
            głębokiej pracy. Przerwa? Ciepłe przyciemnienie samo się włącza.
          </p>
          <a
            href="#promo-hero"
            className="self-start text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity"
          >
            Zgarnij zniżkę →
          </a>
        </div>
        {/* Image — right on desktop */}
        <div className="relative min-h-[400px] overflow-hidden order-1 md:order-2">
          <Image
            src="/room/sypialnia/room-cool.jpg"
            alt="Sypialnia w chłodnym oświetleniu"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
            className="object-cover"
          />
        </div>
      </section>

      {/* 4. Simulator preview */}
      <section className="bg-[var(--cream)] border-b border-[var(--text)] border-opacity-10">
        <div className="px-8 md:px-14 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--text)] border-opacity-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text)] opacity-20 block mb-2">
              04 — Symulator
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(28px,3.5vw,48px)] leading-[0.95] text-[var(--text)]">
              Zobacz różnicę <em className="text-[var(--red)]">sam.</em>
            </h2>
          </div>
          <Link
            href="/simulator"
            className="text-[10px] uppercase tracking-[0.2em] text-[var(--text)] border-b border-[var(--text)] border-opacity-30 pb-px hover:opacity-60 transition-opacity shrink-0"
          >
            Pełny symulator →
          </Link>
        </div>
        <RoomImages roomId="salon" />
      </section>

      {/* 5. Demo form */}
      <PromoDemo />
    </main>
  )
}
