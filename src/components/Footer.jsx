import { Link, useLocation } from 'react-router-dom'

const PHONE = '07 86 51 54 08'

export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const hashHref = (id) => (isHome ? `#${id}` : `/#${id}`)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <span className="footer-logo">Scalyo Agency</span>
          <div className="footer-links">
            <a href={hashHref('services')}>Services</a>
            <a href={hashHref('approche')}>Approche</a>
            <a href={hashHref('contact')}>Contact</a>
          </div>
          <div className="footer-info">
            SIREN 106445166<br />
            Tél : {PHONE}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Scalyo Agency. Tous droits réservés.</span>
          <div className="footer-legal-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
