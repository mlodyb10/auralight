# Privacy, Terms, Contact Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/privacy`, `/terms`, `/contact` subpages to the Aura Next.js app, with real Polish legal text, a static contact form, and live Footer links.

**Architecture:** Shared `LegalLayout` component handles the 2-column sticky-TOC pattern reused by Privacy and Terms. Contact gets its own `ContactForm` client component with a success-state swap. All pages follow the existing `PageHero + content + Footer` pattern.

**Tech Stack:** Next.js 16 App Router, React 19, Framer Motion 12, Tailwind CSS 4, TypeScript 5

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/LegalLayout.tsx` | 2-column sticky TOC + sectioned content |
| Create | `components/ContactForm.tsx` | Client form with success state |
| Create | `app/privacy/page.tsx` | Privacy route — metadata + PageHero + LegalLayout |
| Create | `app/terms/page.tsx` | Terms route — metadata + PageHero + LegalLayout |
| Create | `app/contact/page.tsx` | Contact route — metadata + PageHero + ContactForm |
| Modify | `components/Footer.tsx` | Replace static spans with `<Link>` |

---

## Task 1: LegalLayout component

**Files:**
- Create: `components/LegalLayout.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/LegalLayout.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export interface LegalSection {
  id: string
  number: string
  title: string
  content: string
}

export default function LegalLayout({ sections }: { sections: LegalSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')
  const refs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = refs.current[id]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="flex min-h-[60vh]"
    >
      {/* Sticky TOC — desktop only */}
      <aside className="hidden md:block w-[220px] shrink-0 border-r border-[var(--red)] border-opacity-10">
        <div className="sticky top-[60px] px-5 py-8">
          <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-4">
            Spis treści
          </div>
          <nav className="flex flex-col gap-2.5">
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`text-[8px] leading-snug transition-all ${
                  activeId === id
                    ? 'text-[var(--cream)] opacity-90 pl-[10px] border-l border-[var(--red)]'
                    : 'text-[var(--cream)] opacity-30 pl-[11px] hover:opacity-60'
                }`}
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 px-7 md:px-10 py-8 max-w-2xl">
        {/* Mobile TOC — horizontal scroll pills */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 mb-6">
          {sections.map(({ id, number }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`shrink-0 text-[7px] uppercase tracking-[0.25em] px-3 py-1.5 border transition-all ${
                activeId === id
                  ? 'border-[var(--red)] text-[var(--red)]'
                  : 'border-[var(--cream)] border-opacity-20 text-[var(--cream)] opacity-40'
              }`}
            >
              {number}
            </a>
          ))}
        </div>

        {sections.map(({ id, number, title, content }, i) => (
          <div
            key={id}
            id={id}
            ref={el => { refs.current[id] = el }}
          >
            {i > 0 && <div className="h-px bg-[var(--red)] opacity-[0.08] my-8" />}
            <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-60 mb-1">
              {number}
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[18px] font-light text-[var(--cream)] mb-3">
              {title}
            </h2>
            <p className="text-[9px] text-[var(--cream)] opacity-45 leading-[1.8] whitespace-pre-line">
              {content}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no TypeScript errors related to `LegalLayout.tsx`. Build may fail on other files not yet created — that is fine at this stage, check only for errors in `components/LegalLayout.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/LegalLayout.tsx
git commit -m "feat: add LegalLayout component with sticky TOC"
```

---

## Task 2: Privacy page

**Files:**
- Create: `app/privacy/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/privacy/page.tsx
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
```

- [ ] **Step 2: Start dev server and verify the page**

```bash
npm run dev
```

Open `http://localhost:3000/privacy`. Verify:
- PageHero renders with red italic accent
- 6 sections visible with numbered headers
- Desktop: sticky TOC on left, active section highlights with red border
- Mobile (resize browser): horizontal pill row replaces TOC

- [ ] **Step 3: Commit**

```bash
git add app/privacy/page.tsx
git commit -m "feat: add /privacy page with RODO-compliant Polish text"
```

---

## Task 3: Terms page

**Files:**
- Create: `app/terms/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/terms/page.tsx
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
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/terms`. Verify same layout as `/privacy` with different content and hero text.

- [ ] **Step 3: Commit**

```bash
git add app/terms/page.tsx
git commit -m "feat: add /terms page with Polish SaaS terms of service"
```

---

## Task 4: ContactForm component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/ContactForm.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASING } from '@/lib/constants'

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="grid md:grid-cols-[220px_1fr] min-h-[420px]">
      {/* Left — contact info */}
      <div className="border-r border-[var(--red)] border-opacity-10 px-7 md:px-5 py-8 md:py-10">
        <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-4">Kontakt</div>
        <div className="text-[9px] text-[var(--cream)] opacity-50 leading-[1.8] mb-8">
          hello@aura.pl<br />
          Warszawa, Polska
        </div>
        <div className="text-[7px] uppercase tracking-[0.3em] text-[var(--red)] opacity-70 mb-3">Social</div>
        <div className="text-[9px] text-[var(--cream)] opacity-35 leading-[1.8]">
          Instagram<br />
          LinkedIn<br />
          GitHub
        </div>
        <p className="mt-10 text-[9px] text-[var(--cream)] opacity-20 italic font-[family-name:var(--font-cormorant)] leading-snug">
          &ldquo;Każde pytanie<br />jest dobre.&rdquo;
        </p>
      </div>

      {/* Right — form / success */}
      <div className="px-7 md:px-10 py-8 md:py-10">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASING.editorial }}
              className="flex flex-col justify-center h-full min-h-[280px]"
            >
              <div className="text-[7px] uppercase tracking-[0.4em] text-[var(--red)] opacity-60 mb-4">Wysłano</div>
              <p className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,4vw,40px)] font-light text-[var(--cream)] leading-[1.1]">
                Dziękujemy.<br />
                <em className="text-[var(--red)]">Odezwiemy się wkrótce.</em>
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <FormField label="Imię i nazwisko" name="name" type="text" placeholder="Jan Kowalski" required />
                <FormField label="Adres email" name="email" type="email" placeholder="jan@example.com" required />
              </div>
              <div className="mb-6">
                <FormField label="Temat" name="subject" type="text" placeholder="Pytanie o produkt" required />
              </div>
              <div className="mb-8">
                <FormTextarea label="Wiadomość" name="message" placeholder="Napisz coś..." required />
              </div>
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  className="text-[9px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-80 transition-opacity"
                >
                  Wyślij wiadomość
                </button>
                <span className="text-[8px] text-[var(--cream)] opacity-20">Żadnego spamu. Nigdy.</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function FormField({ label, name, type, placeholder, required }: {
  label: string
  name: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[7px] uppercase tracking-[0.25em] text-[var(--cream)] opacity-35 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-[var(--cream)] border-opacity-15 pb-2 text-[9px] text-[var(--cream)] placeholder:opacity-20 focus:outline-none focus:border-opacity-40 transition-all"
      />
    </div>
  )
}

function FormTextarea({ label, name, placeholder, required }: {
  label: string
  name: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-[7px] uppercase tracking-[0.25em] text-[var(--cream)] opacity-35 mb-2">
        {label}
      </label>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="w-full bg-transparent border-b border-[var(--cream)] border-opacity-15 pb-2 text-[9px] text-[var(--cream)] placeholder:opacity-20 focus:outline-none focus:border-opacity-40 transition-all resize-none"
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: add ContactForm component with success state"
```

---

## Task 5: Contact page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/contact/page.tsx
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
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/contact`. Verify:
- PageHero with "Napisz / do nas." (red italic)
- Left column: email, social, quote
- Right column: form with 4 fields + red submit button
- Fill form and click submit → form fades out, success message fades in with red italic "Odezwiemy się wkrótce."

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: add /contact page"
```

---

## Task 6: Footer — live links

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace static spans with Link components**

Replace the entire contents of `components/Footer.tsx` with:

```tsx
// components/Footer.tsx
import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms',   href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-[var(--red)] border-opacity-15 px-8 md:px-14 py-6 flex items-center">
      <span className="font-[family-name:var(--font-cormorant)] font-light text-base tracking-[0.4em] text-[var(--cream)] opacity-25">
        AURA
      </span>
      <nav className="ml-auto flex gap-6">
        {FOOTER_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-[9px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20 hover:opacity-40 transition-opacity"
          >
            {label}
          </Link>
        ))}
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20">
          © {new Date().getFullYear()}
        </span>
      </nav>
    </footer>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `/` (or any page). Click each footer link — Privacy, Terms, Contact — and confirm they route to the correct pages. Hover should show `opacity-40`.

- [ ] **Step 3: Final build check**

```bash
npm run build
```

Expected: exits with code 0, no TypeScript errors, 3 new static routes listed: `/privacy`, `/terms`, `/contact`.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: wire footer links to /privacy /terms /contact"
```
