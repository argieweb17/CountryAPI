function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200/90 bg-white/75 px-4 py-4 text-xs text-slate-500 shadow-sm backdrop-blur sm:px-5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-slate-700">{year} CountyAPI.</span>
          <span>Built with React, Axios, React Router, and Tailwind CSS.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
