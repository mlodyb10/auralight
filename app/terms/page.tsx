import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import LegalLayout, { type LegalSection } from '@/components/LegalLayout'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Regulamin — Aura',
  description: 'Regulamin korzystania z usługi Aura.',
}

const SECTIONS: LegalSection[] = [
  {
    id: 'definicje',
    number: '01',
    title: 'Definicje',
    content: `Na potrzeby niniejszego Regulaminu przyjmuje się następujące definicje:
— Usługodawca — Aura Sp. z o.o. z siedzibą w Warszawie,
— Użytkownik — osoba fizyczna, prawna lub jednostka organizacyjna, która zawarła umowę o świadczenie Usługi,
— Usługa — system inteligentnego sterowania oświetleniem Aura, dostępny jako aplikacja mobilna i panel webowy,
— Konto — indywidualne konto Użytkownika w systemie Aura,
— Abonament — płatny plan dostępu do rozszerzonych funkcji Usługi.`,
  },
  {
    id: 'usluga',
    number: '02',
    title: 'Świadczenie usługi',
    content: `Dostęp do Usługi następuje po rejestracji Konta i potwierdzeniu adresu e-mail. Usługodawca zobowiązuje się do świadczenia Usługi z dostępnością na poziomie 99,5% miesięcznie (SLA).

Usługodawca zastrzega prawo do przerw technicznych niezbędnych do utrzymania i rozwoju systemu. O planowanych przerwach Użytkownicy będą informowani z co najmniej 24-godzinnym wyprzedzeniem.

Usługodawca może zawiesić Konto w przypadku naruszenia postanowień Regulaminu.`,
  },
  {
    id: 'platnosci',
    number: '03',
    title: 'Płatności i abonament',
    content: `Plany Abonamentowe są dostępne w cyklu miesięcznym lub rocznym. Subskrypcja odnawia się automatycznie, chyba że Użytkownik anuluje ją przed końcem okresu rozliczeniowego.

Użytkownik ma prawo do zwrotu środków w ciągu 14 dni od pierwszego zakupu Abonamentu, jeżeli nie korzystał z funkcji Premium w tym czasie.

Zmiany cennika obowiązują od następnego okresu rozliczeniowego. Usługodawca informuje o zmianach z 30-dniowym wyprzedzeniem.`,
  },
  {
    id: 'odpowiedzialnosc',
    number: '04',
    title: 'Odpowiedzialność',
    content: `Usługodawca nie ponosi odpowiedzialności za szkody pośrednie, utratę zysku ani utratę danych wynikające z korzystania lub niemożności korzystania z Usługi.

Użytkownik odpowiada za bezpieczeństwo swoich danych logowania. Usługodawca zaleca regularne tworzenie kopii zapasowych konfiguracji.

Maksymalna odpowiedzialność Usługodawcy wobec Użytkownika nie przekracza kwoty opłat uiszczonych przez Użytkownika w ciągu ostatnich 12 miesięcy.`,
  },
  {
    id: 'zmiany-regulaminu',
    number: '05',
    title: 'Zmiany Regulaminu',
    content: `Usługodawca zastrzega prawo do zmiany Regulaminu. O każdej zmianie Użytkownicy zostaną poinformowani drogą e-mailową z co najmniej 14-dniowym wyprzedzeniem.

Dalsze korzystanie z Usługi po upływie okresu powiadomienia oznacza akceptację nowego Regulaminu. Użytkownik, który nie akceptuje zmian, ma prawo wypowiedzieć umowę ze skutkiem natychmiastowym.`,
  },
  {
    id: 'postanowienia',
    number: '06',
    title: 'Postanowienia końcowe',
    content: `Regulamin podlega prawu polskiemu. Wszelkie spory wynikające z umowy o świadczenie Usługi będą rozstrzygane przez sąd właściwy dla siedziby Usługodawcy.

W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu Cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.

Kontakt: hello@aura.pl`,
  },
]

export default function TermsPage() {
  return (
    <>
      <main>
        <PageHero
          number="06"
          eyebrow="Terms of Service"
          title="Zasady które"
          titleAccent="mają sens."
          subtitle="Ostatnia aktualizacja: 1 stycznia 2026"
        />
        <LegalLayout sections={SECTIONS} />
      </main>
      <Footer />
    </>
  )
}
