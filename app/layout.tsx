import type { Metadata } from 'next'
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

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
  title: 'Aura — Light that understands you',
  description: 'Inteligentne oświetlenie sterowane AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
      <body className="font-[family-name:var(--font-space)]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
