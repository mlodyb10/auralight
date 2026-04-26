# Design: Privacy, Terms, Contact pages

**Date:** 2026-04-26  
**Status:** Approved

## Overview

Add three new subpages to the Aura Next.js app: `/privacy`, `/terms`, `/contact`. All three follow the existing page pattern (PageHero + content below), using a 2-column sidebar layout. Footer links updated from static `<span>` to `<Link>`.

## Routes

| Path | Title | Description |
|------|-------|-------------|
| `/privacy` | Polityka Prywatności | RODO-compliant privacy policy in Polish |
| `/terms` | Regulamin | SaaS terms of service in Polish |
| `/contact` | Kontakt | Static contact form (no backend) |

## Architecture

### New files

```
app/privacy/page.tsx
app/terms/page.tsx
app/contact/page.tsx
components/LegalLayout.tsx
```

### Modified files

```
components/Footer.tsx   — <span> → <Link> for privacy/terms/contact
```

---

## Component: `LegalLayout`

Shared layout for Privacy and Terms. Accepts structured content, renders 2-column layout.

**Props:**
```ts
interface Section {
  id: string
  number: string   // "01", "02", ...
  title: string
  content: string  // plain text, may contain newlines
}

interface LegalLayoutProps {
  sections: Section[]
}
```

**Left column (220px, sticky):**
- Label "Spis treści" in red caps
- List of section titles; active section highlighted with red left-border via `IntersectionObserver`
- On mobile: collapses to a horizontal scrollable pill row above the content

**Right column:**
- Each section: red number label (7px caps), Cormorant heading (18px light), body text (9px, 0.45 opacity, 1.8 line-height)
- Thin red separator line between sections
- Sections have `id` attributes for scroll-spy anchor links

**Animation:** Content fades in (`initial opacity: 0, animate opacity: 1, delay 0.3s`).

---

## Page: `/privacy`

**Metadata:** `title: 'Polityka Prywatności — Aura'`

**PageHero:**
- number: `"05"`
- eyebrow: `"Privacy Policy"`
- title: `"Twoje dane."`
- titleAccent: `"Twoja sprawa."`
- subtitle: `"Ostatnia aktualizacja: 1 stycznia 2026"`

**Sections (6):**
1. Administrator danych — Aura Sp. z o.o., Warszawa, hello@aura.pl
2. Zbierane dane — email, preferencje, dane urządzenia; brak sprzedaży danych
3. Cel przetwarzania — realizacja umowy, personalizacja, komunikacja, bezpieczeństwo
4. Prawa użytkownika — dostęp, sprostowanie, usunięcie, przenoszenie, sprzeciw (art. 15–21 RODO)
5. Pliki cookies — sesyjne i analityczne; możliwość wyłączenia w ustawieniach przeglądarki
6. Kontakt — hello@aura.pl, odpowiedź w ciągu 30 dni

---

## Page: `/terms`

**Metadata:** `title: 'Regulamin — Aura'`

**PageHero:**
- number: `"06"`
- eyebrow: `"Terms of Service"`
- title: `"Zasady które"`
- titleAccent: `"mają sens."`
- subtitle: `"Ostatnia aktualizacja: 1 stycznia 2026"`

**Sections (6):**
1. Definicje — Usługa, Użytkownik, Konto, Abonament
2. Świadczenie usługi — dostęp po rejestracji, SLA 99.5%, prawo do przerw technicznych
3. Płatności — miesięczne/roczne, odnowienie automatyczne, zwrot w ciągu 14 dni
4. Odpowiedzialność — wyłączenie odpowiedzialności za szkody pośrednie; backup po stronie użytkownika
5. Zmiany regulaminu — powiadomienie emailem z 14-dniowym wyprzedzeniem
6. Kontakt — hello@aura.pl

---

## Page: `/contact`

**Metadata:** `title: 'Kontakt — Aura'`

**PageHero:**
- number: `"04"`
- eyebrow: `"Contact"`
- title: `"Napisz"`
- titleAccent: `"do nas."`
- subtitle: `"Odpowiadamy w ciągu 24 godzin."`

**Layout:** 2-column (220px left + 1fr right), same grid as LegalLayout but without sticky TOC.

**Left column — contact info:**
- Label "Kontakt" (red caps)
- Email: hello@aura.pl
- Location: Warszawa, Polska
- Label "Social"
- Links: Instagram, LinkedIn, GitHub (static text, no real hrefs needed for portfolio)
- Italic quote: *"Każde pytanie jest dobre."* (Cormorant, dimmed)

**Right column — form:**
- Fields: Imię i nazwisko, Adres email (2-col grid), Temat (full width), Wiadomość (textarea, min-height 120px)
- All inputs: borderless except bottom border (`rgba(221,219,214,0.15)`), placeholder text dimmed
- Submit button: red background, white text, uppercase caps — `Wyślij wiadomość`
- Note below button: `"Żadnego spamu. Nigdy."` (dimmed)
- On submit: `e.preventDefault()`, replace form with success state — `"Dziękujemy. Odezwiemy się wkrótce."` with fade-in animation
- No backend, no fetch

---

## Footer update

Replace static `<span>` elements with `<Link>` for privacy/terms/contact:

```tsx
// Before
<span key={l} className="...opacity-20">{l}</span>

// After
const FOOTER_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]
// rendered as <Link href={href}> with hover:opacity-40 transition
```

---

## Styling notes

- All pages use `bg-[var(--deep)]` base, `text-[var(--cream)]`
- Separator lines: `bg-[var(--red)] opacity-[0.08]`
- Section numbers: `text-[var(--red)] text-[7px] tracking-[0.3em] uppercase opacity-60`
- Section headings: `font-[family-name:var(--font-cormorant)] text-[18px] font-light text-[var(--cream)]`
- Body text: `text-[9px] text-[var(--cream)] opacity-45 leading-[1.8]`
- Active TOC item: `border-l border-[var(--red)]` + full opacity

## Out of scope

- Email delivery (Resend/Nodemailer) — portfolio project, form is static UI only
- Cookie consent banner
- Multi-language support
