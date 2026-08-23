import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

type RevealOptions = {
  /** Décalage vertical de départ (px). */
  y?: number
  duration?: number
  /** Cascade : sélecteur d'enfants à animer en décalé. Sinon l'élément lui-même. */
  targets?: string
  /** Délai entre chaque enfant (avec `targets`). */
  stagger?: number
  /** Point de déclenchement ScrollTrigger. */
  start?: string
}

/**
 * Reveal au scroll : fondu + léger translate vers le haut à l'entrée dans le viewport.
 * Respecte prefers-reduced-motion (contenu laissé visible, sans animation).
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const { y = 24, duration = 0.9, targets, stagger = 0.12, start = 'top 85%' } = options

    const ctx = gsap.context(() => {
      const nodes = targets ? el.querySelectorAll(targets) : el
      gsap.from(nodes, {
        opacity: 0,
        y,
        duration,
        ease: 'power3.out',
        stagger: targets ? stagger : 0,
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
