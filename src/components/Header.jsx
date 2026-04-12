function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Country Intelligence Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          NationNode Country Explorer
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Explore detailed country profiles with live API data, focused visual clarity,
          and responsive interaction.
        </p>
      </div>
    </header>
  )
}

export default Header
