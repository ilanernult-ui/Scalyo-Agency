import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Barre givrée dès qu'on scrolle : le contenu des sections ne transparaît
  // plus derrière la nav (corrige le chevauchement « Scalyo » / « SERVICES »).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-hairline bg-ink-950/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#hero" className="text-mist-100 text-lg font-600 tracking-tight">
          Scalyo
        </a>

        <ul className="hidden items-center gap-8 text-sm text-mist-500 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-mist-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-hairline px-4 py-1.5 text-sm text-mist-100 transition-colors hover:border-accent hover:text-accent-soft"
        >
          Parlons-en
        </a>
      </nav>
    </header>
  )
}
