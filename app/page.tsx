import Hero from '@/components/Hero'
import Simulator from '@/components/Simulator'
import Features from '@/components/Features'
import CtaSection from '@/components/CtaSection'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
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
