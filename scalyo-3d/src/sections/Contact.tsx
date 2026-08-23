import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal<HTMLElement>({ targets: '[data-reveal]', y: 28, stagger: 0.12 })

  return (
    <section
      id="contact"
      ref={ref}
      className="mx-auto max-w-6xl px-6 py-40 text-center"
    >
      <p data-reveal className="mb-6 text-sm uppercase tracking-[0.25em] text-mist-500">
        Contact
      </p>

      <h2 data-reveal className="mx-auto max-w-3xl text-5xl font-500 tracking-tight text-mist-100 md:text-6xl">
        On construit <span className="accent text-accent-soft">quelque chose</span> ensemble ?
      </h2>

      <a
        data-reveal
        href="mailto:hello@scalyo.com"
        className="mt-10 inline-block rounded-full bg-accent px-7 py-3 text-white transition-opacity hover:opacity-90"
      >
        hello@scalyo.com
      </a>
    </section>
  )
}
