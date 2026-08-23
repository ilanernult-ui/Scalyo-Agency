import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Smooth-scroll global via Lenis, synchronisé avec GSAP ScrollTrigger.
 * - Lenis est piloté par le ticker GSAP (une seule boucle RAF).
 * - Chaque scroll Lenis déclenche ScrollTrigger.update().
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Recalcule les positions une fois la mise en page stabilisée (polices, etc.).
    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 300)
    window.addEventListener('load', refresh)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
