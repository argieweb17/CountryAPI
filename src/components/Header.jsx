function Header() {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full bg-teal-100/70 blur-2xl" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-sky-100/50 blur-2xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <p className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm">
          Country Intelligence Dashboard
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          NationNode Country Explorer
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Explore detailed country profiles with live API data, polished motion, and
          responsive interaction patterns designed for fast discovery.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            Live API
          </span>
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            Debounced Search
          </span>
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
            Virtualized List
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
