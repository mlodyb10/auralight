import Navigation from '@/components/Navigation'
import PageHero from '@/components/PageHero'
import PricingCards from '@/components/PricingCards'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Pricing — Aura',
  description: 'Proste plany. Bez niespodzianek.',
}

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          number="02"
          eyebrow="Pricing"
          title="Proste plany."
          titleAccent="Zero niespodzianek."
          subtitle="Zacznij za darmo, skaluj kiedy chcesz. Żadnych umów długoterminowych."
        />
        <PricingCards />
      </main>
      <Footer />
    </>
  )
}
