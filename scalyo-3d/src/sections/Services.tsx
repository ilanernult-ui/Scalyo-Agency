import { useReveal } from '../hooks/useReveal'

const SERVICES = [
  {
    n: '01',
    title: 'Agents IA',
    desc: 'Assistants et automatisations sur-mesure, connectés à vos outils et vos données.',
  },
  {
    n: '02',
    title: 'Sites web',
    desc: 'Interfaces premium, éditoriales et performantes — du concept au déploiement.',
  },
  {
    n: '03',
    title: 'Infra IA',
    desc: 'Pipelines, RAG et infrastructure de production pour faire tourner vos modèles.',
  },
]

export default function Services() {
  const headerRef = useReveal<HTMLElement>()
  const gridRef = useReveal<HTMLDivElement>({ targets: 'article', y: 32, stagger: 0.14 })

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-32">
      <header ref={headerRef} className="mb-16 max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.25em] text-mist-500">
          Services
        </p>
        <h2 className="text-4xl font-500 tracking-tight text-mist-100 md:text-5xl">
          Trois métiers, <span className="accent text-accent-soft">une équipe</span>.
        </h2>
      </header>

      <div
        ref={gridRef}
        className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-3"
      >
        {SERVICES.map((s) => (
          <article
            key={s.n}
            className="group bg-ink-900 p-8 transition-colors hover:bg-ink-800"
          >
            <span className="text-sm text-mist-700 transition-colors group-hover:text-accent">
              {s.n}
            </span>
            <h3 className="mt-6 text-2xl font-500 text-mist-100">{s.title}</h3>
            <p className="mt-3 text-mist-500">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
