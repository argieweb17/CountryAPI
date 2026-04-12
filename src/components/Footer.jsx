function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 text-xs text-slate-500 sm:px-6 lg:px-8">
      <p className="border-t border-slate-200 pt-5">
        {year} CountyAPI. Built with React, Axios, React Router, and Tailwind CSS.
      </p>
    </footer>
  )
}

export default Footer
