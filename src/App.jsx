import { useState, useEffect, useRef, useCallback } from 'react'

const PHONE = '07 86 51 54 08'
const PHONE_LINK = 'tel:+33786515408'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', style }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    ['Présentation', '#presentation'],
    ['Services', '#services'],
    ['Approche', '#approche'],
    ['Contact', '#contact'],
  ]

  const closeMenu = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a href="#" className="logo">Scalyo Agency</a>
          <div className="nav-links">
            {navItems.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-nav">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={closeMenu}>{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <Reveal><p className="hero-label">Agence IA & Web sur mesure</p></Reveal>
            <Reveal>
              <h1>Nous accélérons la croissance de votre entreprise</h1>
            </Reveal>
            <Reveal>
              <p className="hero-subtitle">
                Sites web performants, agents IA et infrastructures sur mesure. De l'audit au déploiement, nous gérons tout.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* 01 — Présentation */}
      <section id="presentation" className="section">
        <div className="container">
          <Reveal>
            <div className="intro-grid">
              <div className="intro-big-number">01</div>
              <div className="intro-content">
                <h2>Une agence IA pensée pour votre croissance</h2>
                <p>
                  Scalyo Agency se positionne comme votre partenaire de croissance. Nous combinons
                  intelligence artificielle, automatisation et développement web pour aider les
                  entreprises de tous secteurs à passer à l'échelle. Notre rôle ne se limite pas à
                  livrer une solution : nous concevons des systèmes qui travaillent pour vous, réduisent
                  vos tâches répétitives et transforment vos visiteurs en clients. De la première
                  analyse de vos besoins jusqu'au déploiement et à la maintenance, nous prenons en
                  charge l'intégralité de votre projet.
                </p>
                <div className="intro-stats">
                  <div className="intro-stat">
                    <div className="stat-value">14 jours</div>
                    <div className="stat-label">délai moyen</div>
                  </div>
                  <div className="intro-stat">
                    <div className="stat-value">24h/24</div>
                    <div className="stat-label">disponibilité</div>
                  </div>
                  <div className="intro-stat">
                    <div className="stat-value">100%</div>
                    <div className="stat-label">sur mesure</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — Services */}
      <section id="services" className="section section-gray">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="section-number">02</p>
              <h2 className="section-title">Ce que nous faisons</h2>
            </div>
          </Reveal>
          {[
            {
              num: '01',
              name: 'Sites web sur mesure',
              desc: "Nous concevons des sites web modernes, rapides et optimisés pour convertir vos visiteurs en clients. Design unique, SEO natif, responsive et livré en moins de 14 jours.",
            },
            {
              num: '02',
              name: 'Agents IA & automatisation',
              desc: "Nos agents IA travaillent pour vous 24h/24. Ils répondent à vos clients, prennent des rendez-vous et qualifient vos prospects automatiquement. Vous vous concentrez sur votre métier.",
            },
            {
              num: '03',
              name: 'Infrastructure IA sur mesure',
              desc: "Nous connectons vos outils et automatisons vos processus métier. Un écosystème IA complet qui fait évoluer votre entreprise sans effort supplémentaire de votre part.",
            },
          ].map((s) => (
            <Reveal key={s.num}>
              <div className="service-row">
                <div className="service-num">{s.num}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 03 — Résultats */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="section-number">03</p>
              <h2 className="section-title">Les résultats pour votre entreprise</h2>
            </div>
          </Reveal>
          <div className="results-grid">
            {[
              { value: '80%', text: 'des tâches répétitives automatisées' },
              { value: '14 jours', text: 'délai moyen de déploiement de votre solution' },
              { value: '24h/24', text: 'votre système travaille sans interruption' },
            ].map((r, i) => (
              <Reveal key={i}>
                <div className="result-block">
                  <div className="result-value">{r.value}</div>
                  <p className="result-text">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Notre approche */}
      <section id="approche" className="section section-dark">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="section-number">04</p>
              <h2 className="section-title">De l'audit au déploiement</h2>
            </div>
          </Reveal>
          <div className="approach-timeline">
            {[
              { num: '01', title: 'Audit gratuit', desc: "Nous analysons votre business, vos besoins et vos objectifs. Cette première étape est gratuite et sans engagement." },
              { num: '02', title: 'Conception', desc: "Nous designons votre solution sur mesure et vous présentons une maquette détaillée. Vous validez avant le développement." },
              { num: '03', title: 'Déploiement', desc: "Nous développons, testons et mettons en ligne votre solution en moins de 14 jours, avec une optimisation complète." },
              { num: '04', title: 'Maintenance', desc: "Nous assurons le suivi, les mises à jour et l'évolution continue. Un interlocuteur unique reste à votre disposition." },
            ].map((s, i) => (
              <Reveal key={i}>
                <div className="approach-step">
                  <p className="approach-num">{s.num}</p>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Pourquoi nous */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="section-number">05</p>
              <h2 className="section-title">Pourquoi choisir Scalyo Agency</h2>
            </div>
          </Reveal>
          <div className="why-grid">
            {[
              { title: 'Sur mesure à 100%', desc: "Pas de template, pas de solution générique. Chaque projet est conçu spécifiquement pour votre business, vos objectifs et vos contraintes." },
              { title: 'Stack premium', desc: "Nous utilisons les meilleures technologies du marché : React, IA de pointe, infrastructures cloud robustes, rapides et évolutives." },
              { title: 'Accompagnement continu', desc: "Notre relation ne s'arrête pas à la livraison. Maintenance, mises à jour et évolution : un partenaire de croissance à long terme." },
              { title: 'Résultats mesurables', desc: "Chaque solution est pensée pour générer un retour concret : plus de leads, plus d'automatisation, plus de temps pour votre métier." },
            ].map((w, i) => (
              <Reveal key={i}>
                <div className="why-item">
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="container contact-inner">
          <Reveal>
            <h2>Prêt à faire évoluer votre entreprise ?</h2>
            <p className="contact-sub">
              L'audit initial est gratuit et sans engagement. Réponse garantie sous 24h.
            </p>
            <a href={PHONE_LINK} className="btn btn-primary">Intéressé ? Contactez-nous au {PHONE}</a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <span className="footer-logo">Scalyo Agency</span>
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#approche">Approche</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-info">
              SIREN 106445166<br />
              Tél : {PHONE}
            </div>
          </div>
          <div className="footer-bottom">
            © 2026 Scalyo Agency. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  )
}
