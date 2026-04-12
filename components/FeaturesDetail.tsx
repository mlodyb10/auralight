'use client'
import { motion } from 'framer-motion'
import { Zap, Moon, Cpu, Smartphone, Sun, Shield, type LucideIcon } from 'lucide-react'
import { EASING } from '@/lib/constants'

const ICON_MAP: Record<string, LucideIcon> = { Zap, Moon, Cpu, Smartphone, Sun, Shield }

const FEATURES_DETAIL = [
  {
    n: '01', icon: 'Zap', title: 'AI Scenes',
    lead: 'Oświetlenie które uczy się Twoich nawyków.',
    body: 'System analizuje Twój rytm dobowy i automatycznie tworzy sceny światła dopasowane do pory dnia, aktywności i nastroju. Poranny blask pobudza. Wieczorna miedź relaksuje. Bez jednego dotknięcia.',
    detail: ['Uczenie maszynowe z danych użytkownika', 'Automatyczna aktualizacja scen co tydzień', 'Synchronizacja ze wschodem i zachodem słońca'],
  },
  {
    n: '02', icon: 'Moon', title: 'Night Mode',
    lead: 'Sen bez kompromisów.',
    body: 'Dwie godziny przed snem Aura zaczyna płynnie przechodzić do ciepłego, bursztynowego spektrum. Melatonina nie jest zakłócana. Budzisz się wypoczęty.',
    detail: ['Automatyczny sunset timer', 'Temperatura barwowa < 2200K w trybie nocnym', 'Kompatybilność z Apple Health i Google Fit'],
  },
  {
    n: '03', icon: 'Cpu', title: 'CPU Sync',
    lead: 'Środowisko pracy które reaguje na Ciebie.',
    body: 'Aura łączy się z systemem operacyjnym i monitoruje obciążenie procesora, aktywne aplikacje i poziom skupienia. Podczas głębokiej pracy — chłodne, ostre światło. Podczas przerwy — ciepłe przyciemnienie.',
    detail: ['Native integration macOS / Windows', 'Tryby: Focus, Flow, Break, Meeting', 'API dla własnych reguł automatyzacji'],
  },
  {
    n: '04', icon: 'Smartphone', title: 'App Control',
    lead: 'Pełna kontrola w kieszeni.',
    body: 'Natywne aplikacje iOS i Android z intuicyjnym interfejsem. Twórz sceny gestami, udostępniaj je rodzinie, kontroluj każdą żarówkę osobno lub wszystkie jednocześnie.',
    detail: ['iOS 16+ / Android 12+', 'Widżety ekranu głównego', 'Skróty Siri i Google Assistant'],
  },
  {
    n: '05', icon: 'Sun', title: '16M Colors',
    lead: 'Pełna paleta. Pełna ekspresja.',
    body: '16 milionów kolorów z precyzją ±1 Kelvin. Biblioteka 200+ gotowych scen oraz nieograniczona personalizacja. Zapisuj ulubione nastroje i przywołuj je jednym tapnięciem.',
    detail: ['CRI > 95 dla naturalnego koloru', 'Precyzja temperatury ±1K', 'Eksport scen do przyjaciół'],
  },
  {
    n: '06', icon: 'Shield', title: 'Smart Home',
    lead: 'Działa z tym co już masz.',
    body: 'Natywna integracja z HomeKit, Google Home i Amazon Alexa. Aura staje się centralnym elementem Twojego inteligentnego domu — wyzwalana przez obecność, rutyny, pogodę czy inne urządzenia.',
    detail: ['Apple HomeKit / Google Home / Alexa', 'Matter & Thread ready', 'Lokalne przetwarzanie — brak chmury'],
  },
]

export default function FeaturesDetail() {
  return (
    <section className="bg-[var(--cream)]">
      {FEATURES_DETAIL.map((f, i) => {
        const Icon = ICON_MAP[f.icon]
        const isEven = i % 2 === 0
        return (
          <div
            key={f.n}
            className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--text)] border-opacity-10 min-h-[320px]"
          >
            {/* Icon / number block */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASING.editorial }}
              viewport={{ once: true, margin: '-60px' }}
              className={`flex flex-col justify-between p-10 md:p-14 border-b md:border-b-0 border-[var(--text)] border-opacity-10 ${
                isEven ? 'md:border-r' : 'md:order-last md:border-l'
              }`}
            >
              <div>
                <span className="text-[9px] tracking-[0.2em] text-[var(--text)] opacity-20">{f.n}</span>
                <Icon size={28} strokeWidth={1.5} className="mt-5 text-[var(--text)] opacity-40" />
              </div>
              <h2 className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(32px,4vw,52px)] leading-[0.95] text-[var(--text)] tracking-tight mt-8">
                {f.title}
              </h2>
            </motion.div>

            {/* Content block */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASING.editorial, delay: 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col justify-center p-10 md:p-14"
            >
              <p className="text-[13px] font-medium text-[var(--text)] mb-3 leading-snug">{f.lead}</p>
              <p className="text-[11px] text-[var(--text)] opacity-50 leading-[1.8] mb-8">{f.body}</p>
              <ul className="space-y-2">
                {f.detail.map(d => (
                  <li key={d} className="flex items-start gap-3 text-[10px] text-[var(--text)] opacity-40">
                    <span className="text-[var(--red)] mt-0.5 shrink-0">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )
      })}

      {/* Bottom CTA */}
      <div className="px-8 md:px-14 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[var(--text)] border-opacity-10">
        <p className="font-[family-name:var(--font-cormorant)] font-light text-[clamp(24px,3vw,40px)] text-[var(--text)] leading-tight">
          Gotowy zobaczyć to<br /><em className="text-[var(--red)]">w akcji?</em>
        </p>
        <a
          href="/pricing"
          className="text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--red)] px-8 py-3.5 hover:opacity-90 transition-opacity shrink-0"
        >
          Zobacz cennik →
        </a>
      </div>
    </section>
  )
}
