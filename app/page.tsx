import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Simulator from '@/components/Simulator'
import Features from '@/components/Features'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Simulator />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
