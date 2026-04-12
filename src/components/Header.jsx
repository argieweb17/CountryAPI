function Header({ theme, onToggleTheme }) {
  const isSoftDark = theme === 'soft-dark'

  return (
    <header className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="pointer-events-none absolute -right-8 -top-12 h-44 w-44 rounded-full bg-teal-100/70 blur-2xl dark:bg-teal-800/30" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-sky-100/50 blur-2xl dark:bg-sky-800/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <p className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800/75 dark:text-slate-300">
            Country Intelligence Dashboard
          </p>

          <button
            type="button"
            onClick={onToggleTheme}
            className="group relative inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            aria-label="Toggle color theme"
            aria-pressed={isSoftDark}
          >
            <span
              className={[
                'inline-block h-2.5 w-2.5 rounded-full transition-colors duration-200',
                isSoftDark ? 'bg-teal-300' : 'bg-slate-700',
              ].join(' ')}
            />
            <span>{isSoftDark ? 'Soft dark' : 'Light'}</span>
          </button>
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
          NationNode Country Explorer
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
          Explore detailed country profiles with live API data, polished motion, and
          responsive interaction patterns designed for fast discovery.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            Live API
          </span>
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            Debounced Search
          </span>
          <span className="rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
            Virtualized List
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
