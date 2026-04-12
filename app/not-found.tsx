import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: '404 — Aura',
}

export default function NotFound() {
  return (
    <>
      <main className="relative min-h-screen bg-[var(--deep)] flex flex-col justify-end pb-24 px-8 md:px-14 pt-24 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[380px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,26,0,0.07) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="relative z-10 max-w-4xl">
          <p className="text-[9px] uppercase tracking-[0.4em] text-[var(--cream)] opacity-30 mb-6">
            <span className="text-[var(--red)] mr-3">404</span>
            Page not found
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(64px,10vw,120px)] leading-[0.92] tracking-tight text-[var(--cream)]">
            Zgubione<br />
            <em className="text-[var(--red)]">w ciemności.</em>
          </h1>
          <p className="mt-6 text-[12px] text-[var(--cream)] opacity-35 leading-relaxed max-w-[280px]">
            Ta strona nie istnieje. Wróć do światła.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-90 transition-opacity"
            >
              ← Strona główna
            </Link>
            <Link
              href="/features"
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-40 border-b border-current pb-px hover:opacity-70 transition-opacity"
            >
              Features
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--red)] opacity-20" />
      </main>
      <Footer />
    </>
  )
}
