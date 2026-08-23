import SmoothScroll from './components/SmoothScroll'
import Grain from './components/Grain'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Realisations from './sections/Realisations'
import Contact from './sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <Grain />
      <Navbar />

      <main>
        <Hero />
        <Services />
        <Realisations />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
