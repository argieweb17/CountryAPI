import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        404
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        This route is not available in the current app.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg border border-slate-900 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Back to explorer
      </Link>
    </section>
  )
}

export default NotFoundPage
