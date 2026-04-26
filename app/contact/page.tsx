import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Kontakt — Aura',
  description: 'Napisz do nas. Odpowiadamy w ciągu 24 godzin.',
}

export default function ContactPage() {
  return (
    <>
      <main>
        <PageHero
          number="04"
          eyebrow="Contact"
          title="Napisz"
          titleAccent="do nas."
          subtitle="Odpowiadamy w ciągu 24 godzin."
        />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
