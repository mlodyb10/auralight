export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-[var(--red)] border-opacity-15 px-8 md:px-14 py-6 flex items-center">
      <span className="font-[family-name:var(--font-cormorant)] font-light text-base tracking-[0.4em] text-[var(--cream)] opacity-25">
        AURA
      </span>
      <nav className="ml-auto flex gap-6">
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <span key={l} className="text-[9px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20">
            {l}
          </span>
        ))}
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--cream)] opacity-20">
          © {new Date().getFullYear()}
        </span>
      </nav>
    </footer>
  )
}
