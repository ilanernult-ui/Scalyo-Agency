import { useEffect, useRef } from 'react'
import HeroCanvas from '../components/canvas/HeroCanvas'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/motion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const content = contentRef.current
    const section = sectionRef.current
    if (!content || !section) return

    const ctx = gsap.context(() => {
      // Intro : apparition en cascade des éléments du hero.
      gsap.from(content.querySelectorAll('[data-hero]'), {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.15,
      })

      // Parallaxe : le texte remonte doucement et s'estompe au scroll.
      gsap.to(content, {
        yPercent: -16,
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Canvas 3D en arrière-plan */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* Voile pour la lisibilité du texte par-dessus la 3D */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/20 to-ink-950" />

      {/* Contenu */}
      <div ref={contentRef} className="relative mx-auto w-full max-w-6xl px-6">
        <p
          data-hero
          className="mb-6 text-sm uppercase tracking-[0.25em] text-mist-500"
        >
          Studio IA · Web · Infra
        </p>

        <h1
          data-hero
          className="max-w-3xl text-5xl leading-[1.02] font-500 tracking-tight text-mist-100 md:text-7xl"
        >
          On conçoit des produits <span className="accent text-accent-soft">intelligents</span> et
          des interfaces <span className="accent text-accent-soft">soignées</span>.
        </h1>

        <p data-hero className="mt-8 max-w-xl text-lg text-mist-500">
          Agents IA, sites web sur-mesure et infrastructure IA — pensés,
          designés et déployés par une même équipe.
        </p>
      </div>
    </section>
  )
}
