import PageHero from '@/components/PageHero'
import RoomSimulator from '@/components/RoomSimulator'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Symulator — Aura',
  description: 'Poczuj różnicę. Wybierz pomieszczenie i dostosuj temperaturę światła.',
}

export default function SimulatorPage() {
  return (
    <>
      <main>
        <PageHero
          number="03"
          eyebrow="Room Simulator"
          title="Poczuj"
          titleAccent="różnicę."
          subtitle="Wybierz pomieszczenie i przesuń suwak — od chłodnej koncentracji po ciepły relaks."
        />
        <RoomSimulator />
      </main>
      <Footer />
    </>
  )
}
