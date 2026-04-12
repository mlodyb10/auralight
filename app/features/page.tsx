import Navigation from '@/components/Navigation'
import PageHero from '@/components/PageHero'
import FeaturesDetail from '@/components/FeaturesDetail'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Features — Aura',
  description: 'Wszystko czym powinno być inteligentne oświetlenie.',
}

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          number="01"
          eyebrow="What Aura does"
          title="Everything light"
          titleAccent="should be."
          subtitle="Sześć technologii które razem tworzą oświetlenie rozumiejące Ciebie — nie tylko Twoje komendy."
        />
        <FeaturesDetail />
      </main>
      <Footer />
    </>
  )
}
