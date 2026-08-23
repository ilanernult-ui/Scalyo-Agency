export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-mist-500 md:flex-row md:items-center md:justify-between">
        <span className="text-mist-300">Scalyo</span>
        <span>© {new Date().getFullYear()} — Studio IA & Web 3D.</span>
      </div>
    </footer>
  )
}
