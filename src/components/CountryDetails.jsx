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
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        role="status"
        aria-label="Loading country details"
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-3">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200/80" />
            <div className="h-8 w-56 animate-pulse rounded bg-slate-200/80" />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={`detail-skeleton-${index}`} className="space-y-2">
                  <div className="h-2.5 w-20 animate-pulse rounded bg-slate-200/70" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200/80" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200/80" />
            <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-slate-200/80" />
          </div>
        </div>
      </article>
    )
  }

  if (!country) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-600">
          Select a country to view full details.
        </p>
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 ease-out">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Country Profile
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {country.name || 'Unknown'}
          </h2>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Capital
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {country.capital || 'N/A'}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Region / Subregion
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {country.region || 'N/A'} / {country.subregion || 'N/A'}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Population
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {formatNumber(country.population)}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Area (km2)
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {formatNumber(country.area)}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Coordinates
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {formatCoordinates(country.coordinates)}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Currency
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {country.currency || 'N/A'}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Timezones
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {Array.isArray(country.timezones) && country.timezones.length > 0
                  ? country.timezones.join(', ')
                  : 'N/A'}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Languages
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {Array.isArray(country.languages) && country.languages.length > 0
                  ? country.languages.join(', ')
                  : 'N/A'}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Flag
          </p>
          <Flag src={country.flag} name={country.name || 'Country'} />
        </div>
      </div>
    </article>
  )
}

export default CountryDetails
