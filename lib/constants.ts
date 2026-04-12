export const COLORS = {
  cream: '#DDDBD6',
  red:   '#FF1A00',
  black: '#080810',
  deep:  '#050508',
  text:  '#0C0C0C',
  warm:  '#FF8C32',
  cool:  '#4A9EFF',
} as const

export const EASING = {
  editorial: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  spring:    { type: 'spring', stiffness: 80, damping: 20 } as const,
}

export const FEATURES_DETAIL = [
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

export const FEATURES = [
  { n: '01', icon: 'Zap',        title: 'AI Scenes',   desc: 'Automatyczne sceny dopasowane do pory dnia i Twojego rytmu biologicznego.' },
  { n: '02', icon: 'Moon',       title: 'Night Mode',  desc: 'Płynne przejście do ciepłego bursztynu — bez zakłócania snu.' },
  { n: '03', icon: 'Cpu',        title: 'CPU Sync',    desc: 'Synchronizacja z systemem — jasność reaguje na obciążenie i skupienie.' },
  { n: '04', icon: 'Smartphone', title: 'App Control', desc: 'Pełna kontrola z poziomu aplikacji iOS i Android.' },
  { n: '05', icon: 'Sun',        title: '16M Colors',  desc: 'Pełna paleta 16 milionów kolorów z pamięcią scen i nastrojów.' },
  { n: '06', icon: 'Shield',     title: 'Smart Home',  desc: 'Natywna integracja z HomeKit, Google Home i Amazon Alexa.' },
] as const
