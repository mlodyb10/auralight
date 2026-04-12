import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Navigation from '@/components/Navigation'
import PageTransition from '@/components/PageTransition'
import HashScroller from '@/components/HashScroller'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-space',
})

export const metadata: Metadata = {
  title: 'Aura — Światło które Cię rozumie',
  description: 'Inteligentne oświetlenie sterowane AI. Żadnych przełączników. Tylko intuicja.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[family-name:var(--font-space)]">
        <LenisProvider>
          <Navigation />
          <HashScroller />
          <PageTransition>{children}</PageTransition>
        </LenisProvider>
      </body>
    </html>
  )
}
