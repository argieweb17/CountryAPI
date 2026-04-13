function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white/75 px-4 py-4 text-xs text-slate-500 shadow-sm backdrop-blur transition-colors duration-300 sm:px-5 dark:border-slate-800/90 dark:bg-slate-900/80 dark:text-slate-400">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-slate-700 dark:text-slate-200">{year} CountyAPI.</span>
          <span>Built with React, Axios, React Router, and Tailwind CSS.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
