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

export const FEATURES = [
  { n: '01', icon: 'Zap',        title: 'AI Scenes',   desc: 'Automatyczne sceny dopasowane do pory dnia i Twojego rytmu biologicznego.' },
  { n: '02', icon: 'Moon',       title: 'Night Mode',  desc: 'Płynne przejście do ciepłego bursztynu — bez zakłócania snu.' },
  { n: '03', icon: 'Cpu',        title: 'CPU Sync',    desc: 'Synchronizacja z systemem — jasność reaguje na obciążenie i skupienie.' },
  { n: '04', icon: 'Smartphone', title: 'App Control', desc: 'Pełna kontrola z poziomu aplikacji iOS i Android.' },
  { n: '05', icon: 'Sun',        title: '16M Colors',  desc: 'Pełna paleta 16 milionów kolorów z pamięcią scen i nastrojów.' },
  { n: '06', icon: 'Shield',     title: 'Smart Home',  desc: 'Natywna integracja z HomeKit, Google Home i Amazon Alexa.' },
] as const
