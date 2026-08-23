import { useReveal } from '../hooks/useReveal'

export default function Realisations() {
  const headerRef = useReveal<HTMLElement>()
  const gridRef = useReveal<HTMLDivElement>({ targets: '[data-card]', y: 32, stagger: 0.1 })

  return (
    <section
      id="realisations"
      className="mx-auto max-w-6xl px-6 py-32"
    >
      <header ref={headerRef} className="mb-16 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-mist-500">
          Réalisations
        </p>
        <h2 className="text-4xl font-500 tracking-tight text-mist-100 md:text-5xl">
          Une sélection de <span className="accent text-accent-soft">projets</span>.
        </h2>
      </header>

      {/* Placeholders — à remplir avec les cas clients */}
      <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            data-card
            className="flex aspect-4/3 items-end rounded-2xl border border-hairline bg-ink-900 p-6"
          >
            <span className="text-mist-700">Projet à venir</span>
          </div>
        ))}
      </div>
    </section>
  )
}
