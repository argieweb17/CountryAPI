import AnimatedNumber from './AnimatedNumber'
import Borders from './Borders'
import Flag from './Flag'

const numberFormatter = new Intl.NumberFormat('en-US')

function formatNumber(value) {
  if (typeof value !== 'number') {
    return 'N/A'
  }

  return numberFormatter.format(value)
}

function formatCoordinates(coordinates) {
  const latitude = coordinates?.latitude
  const longitude = coordinates?.longitude

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return 'N/A'
  }

  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
}

function CountryDetails({ country, onBorderClick, isLoading }) {
  if (isLoading) {
    return (
      <article
        className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-lg shadow-slate-200/45 transition-colors duration-300 dark:border-slate-800/90 dark:bg-slate-900/90 dark:shadow-slate-950/50"
        role="status"
        aria-label="Loading country details"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-100/45 blur-2xl dark:bg-cyan-900/25" />

        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/80" />
            <div className="h-8 w-56 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/80" />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`detail-skeleton-${index}`} className="space-y-2">
                  <div className="h-2.5 w-20 animate-pulse rounded bg-slate-200/70 dark:bg-slate-700/70" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/80" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/80" />
            <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-700/80" />
          </div>
        </div>
      </article>
    )
  }

  if (!country) {
    return (
      <article className="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-lg shadow-slate-200/45 transition-colors duration-300 dark:border-slate-800/90 dark:bg-slate-900/90 dark:shadow-slate-950/50">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Select a country to view full details.
        </p>
      </article>
    )
  }

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-lg shadow-slate-200/45 transition-all duration-200 ease-out dark:border-slate-800/90 dark:bg-slate-900/90 dark:shadow-slate-950/60">
      <div className="pointer-events-none absolute -right-14 -top-12 h-44 w-44 rounded-full bg-emerald-100/45 blur-3xl dark:bg-emerald-900/20" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-sky-100/35 blur-3xl dark:bg-sky-900/20" />

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Country Profile
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {country.name || 'Unknown'}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {country.region || 'N/A'}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {country.subregion || 'Subregion N/A'}
            </span>
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Capital
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {country.capital || 'N/A'}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Region / Subregion
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {country.region || 'N/A'} / {country.subregion || 'N/A'}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Population
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                <AnimatedNumber value={country.population} formatter={formatNumber} />
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Area (km2)
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                <AnimatedNumber value={country.area} formatter={formatNumber} />
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Coordinates
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {formatCoordinates(country.coordinates)}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Currency
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {country.currency || 'N/A'}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Timezones
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {Array.isArray(country.timezones) && country.timezones.length > 0
                  ? country.timezones.join(', ')
                  : 'N/A'}
              </dd>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white/75 p-3 transition-transform duration-200 hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800/85">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Languages
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-100">
                {Array.isArray(country.languages) && country.languages.length > 0
                  ? country.languages.join(', ')
                  : 'N/A'}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Borders
            </h3>
            <div className="mt-2">
              <Borders
                borders={country.borders}
                onBorderClick={onBorderClick}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Flag
          </p>
          <Flag src={country.flag} name={country.name || 'Country'} />
        </div>
      </div>
    </article>
  )
}

export default CountryDetails
