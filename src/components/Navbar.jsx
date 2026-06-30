import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  ['Présentation', 'presentation'],
  ['Services', 'services'],
  ['Approche', 'approche'],
  ['Contact', 'contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMobileOpen(false), [])
  const hashHref = (id) => (isHome ? `#${id}` : `/#${id}`)

  return (
    <nav className={`navbar ${scrolled || !isHome ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="logo" aria-label="Scalyo Agency — accueil">
          <img src="/scalyo-lockup-light.svg" alt="Scalyo Agency" height="34" style={{ display: 'block' }} />
        </Link>
        <div className="nav-links">
          {navItems.map(([label, id]) => (
            <a key={id} href={hashHref(id)}>{label}</a>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map(([label, id]) => (
            <a key={id} href={hashHref(id)} onClick={closeMenu}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}
