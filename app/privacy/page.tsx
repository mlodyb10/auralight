import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import LegalLayout, { type LegalSection } from '@/components/LegalLayout'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Polityka Prywatności — Aura',
  description: 'Informacje o przetwarzaniu danych osobowych w serwisie Aura.',
}

const SECTIONS: LegalSection[] = [
  {
    id: 'administrator',
    number: '01',
    title: 'Administrator danych',
    content: `Administratorem Twoich danych osobowych jest Aura Sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 1, 00-001 Warszawa, NIP 0000000000.

W sprawach dotyczących ochrony danych osobowych możesz skontaktować się z nami pod adresem e-mail: hello@aura.pl lub pisemnie na adres siedziby spółki.`,
  },
  {
    id: 'zakres',
    number: '02',
    title: 'Zakres zbieranych danych',
    content: `Zbieramy wyłącznie dane niezbędne do świadczenia usług: adres e-mail i hasło do rejestracji konta, preferencje oświetleniowe (temperatura barwowa, harmonogramy, profile scen), dane techniczne urządzenia (model, wersja oprogramowania, adres IP) oraz dane o korzystaniu z aplikacji (logi, zdarzenia, czas użytkowania).

Nie zbieramy danych wrażliwych. Nie sprzedajemy danych osobowych podmiotom trzecim.`,
  },
  {
    id: 'cel',
    number: '03',
    title: 'Cel i podstawa prawna przetwarzania',
    content: `Twoje dane przetwarzamy w następujących celach:
— realizacja umowy o świadczenie usług (art. 6 ust. 1 lit. b RODO),
— personalizacja ustawień oświetlenia (prawnie uzasadniony interes, art. 6 ust. 1 lit. f RODO),
— komunikacja z użytkownikiem, w tym odpowiedzi na zapytania (art. 6 ust. 1 lit. b RODO),
— zapewnienie bezpieczeństwa systemu i wykrywanie nadużyć (art. 6 ust. 1 lit. f RODO),
— spełnienie obowiązków prawnych (art. 6 ust. 1 lit. c RODO).`,
  },
  {
    id: 'prawa',
    number: '04',
    title: 'Twoje prawa',
    content: `Przysługują Ci następujące prawa w zakresie ochrony danych:
— prawo dostępu do danych (art. 15 RODO),
— prawo do sprostowania danych (art. 16 RODO),
— prawo do usunięcia danych — „prawo do bycia zapomnianym" (art. 17 RODO),
— prawo do ograniczenia przetwarzania (art. 18 RODO),
— prawo do przenoszenia danych (art. 20 RODO),
— prawo do sprzeciwu (art. 21 RODO).

Aby skorzystać z praw, skontaktuj się z nami na hello@aura.pl. Przysługuje Ci też prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, Warszawa).`,
  },
  {
    id: 'cookies',
    number: '05',
    title: 'Pliki cookies',
    content: `Używamy plików cookies sesyjnych (niezbędnych do działania serwisu) oraz analitycznych (anonimowe statystyki ruchu). Nie stosujemy cookies reklamowych ani śledzących.

Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki. Wyłączenie cookies sesyjnych może uniemożliwić korzystanie z niektórych funkcji serwisu.`,
  },
  {
    id: 'kontakt-dane',
    number: '06',
    title: 'Kontakt w sprawach danych',
    content: `W sprawach związanych z ochroną danych osobowych skontaktuj się z nami:

E-mail: hello@aura.pl
Adres: ul. Przykładowa 1, 00-001 Warszawa

Odpowiadamy na zapytania dotyczące danych w ciągu 30 dni od ich otrzymania.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <main>
        <PageHero
          number="05"
          eyebrow="Privacy Policy"
          title="Twoje dane."
          titleAccent="Twoja sprawa."
          subtitle="Ostatnia aktualizacja: 1 stycznia 2026"
        />
        <LegalLayout sections={SECTIONS} />
      </main>
      <Footer />
    </>
  )
}
