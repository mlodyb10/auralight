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
