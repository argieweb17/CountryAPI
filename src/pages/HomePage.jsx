import { useCallback, useEffect, useMemo, useState } from 'react'
import CountryDetails from '../components/CountryDetails'
import VirtualizedCountryList from '../components/VirtualizedCountryList'
import useDebouncedValue from '../hooks/useDebouncedValue'
import {
  getAllCountries,
  getApiErrorMessage,
  getCountryByName,
} from '../services/countryService'
import { filterCountries } from '../utils/countryFilters'

const defaultCountry = 'Afghanistan'
const listSkeletonRows = 9

function HomePage() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCountryName, setSelectedCountryName] = useState(defaultCountry)
  const [searchTerm, setSearchTerm] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [populationFilter, setPopulationFilter] = useState('all')
  const [listLoading, setListLoading] = useState(true)
  const [detailsLoading, setDetailsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300)

  const loadCountryDetails = useCallback(async (countryName) => {
    setDetailsLoading(true)
    setErrorMessage('')

    try {
      const country = await getCountryByName(countryName)
      setSelectedCountry(country)
      setSelectedCountryName(country?.name || countryName)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
      setSelectedCountry(null)
    } finally {
      setDetailsLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    const initialize = async () => {
      setListLoading(true)
      setErrorMessage('')

      try {
        const countryList = await getAllCountries()

        if (!active) {
          return
        }

        setCountries(countryList)
      } catch (error) {
        if (!active) {
          return
        }

        setErrorMessage(getApiErrorMessage(error))
      } finally {
        if (active) {
          setListLoading(false)
        }
      }

      if (active) {
        await loadCountryDetails(defaultCountry)
      }
    }

    initialize()

    return () => {
      active = false
    }
  }, [loadCountryDetails])

  const regionOptions = useMemo(() => {
    const uniqueRegions = new Set(
      countries.map((country) => country.region).filter(Boolean)
    )

    return ['all', ...Array.from(uniqueRegions).sort((a, b) => a.localeCompare(b))]
  }, [countries])

  const filteredCountries = useMemo(() => {
    return filterCountries(countries, {
      searchTerm: debouncedSearchTerm,
      regionFilter,
      populationFilter,
    })
  }, [countries, debouncedSearchTerm, populationFilter, regionFilter])

  const isSearchPending = searchTerm !== debouncedSearchTerm
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    regionFilter !== 'all' ||
    populationFilter !== 'all'

  const handleCountrySelect = async (countryName) => {
    await loadCountryDetails(countryName)
  }

  const handleBorderSelect = async (borderCountryName) => {
    await loadCountryDetails(borderCountryName)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setRegionFilter('all')
    setPopulationFilter('all')
  }

  return (
    <section className="space-y-8">
      <article className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-lg shadow-slate-200/50 backdrop-blur sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-100/50 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Explorer Controls
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Find Countries Faster
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Search, filter, and jump through large country datasets with smooth
                transitions.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              className={[
                'rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-200',
                hasActiveFilters
                  ? 'border-slate-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-900'
                  : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400',
              ].join(' ')}
            >
              Reset filters
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block rounded-2xl border border-slate-200 bg-white/90 p-3 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-slate-400 focus-within:shadow-md focus-within:shadow-slate-200/70">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Search Country
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Type a country name"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-900"
              />
              <span
                className={[
                  'mt-1 block text-xs text-slate-500 transition-opacity duration-200',
                  isSearchPending ? 'opacity-100' : 'opacity-0',
                ].join(' ')}
              >
                Updating results...
              </span>
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-white/90 p-3 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-slate-400 focus-within:shadow-md focus-within:shadow-slate-200/70">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Filter Region
              </span>
              <select
                value={regionFilter}
                onChange={(event) => setRegionFilter(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-900"
              >
                {regionOptions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'all' ? 'All regions' : region}
                  </option>
                ))}
              </select>
            </label>

            <label className="block rounded-2xl border border-slate-200 bg-white/90 p-3 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-slate-400 focus-within:shadow-md focus-within:shadow-slate-200/70">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Filter Population
              </span>
              <select
                value={populationFilter}
                onChange={(event) => setPopulationFilter(event.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-900"
              >
                <option value="all">All population sizes</option>
                <option value="lt10m">Below 10 million</option>
                <option value="10mTo50m">10 million to 50 million</option>
                <option value="50mTo200m">50 million to 200 million</option>
                <option value="gt200m">Above 200 million</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700">
              {countries.length} countries loaded
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-700">
              {filteredCountries.length} in results
            </span>
            {selectedCountryName ? (
              <span className="rounded-full border border-slate-900 bg-slate-900 px-3 py-1 font-semibold text-white">
                Viewing {selectedCountryName}
              </span>
            ) : null}
          </div>
        </div>
      </article>

      {errorMessage ? (
        <article className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </article>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-4 shadow-lg shadow-slate-200/45 sm:p-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-50 to-transparent" />

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600">
              Country Directory
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {filteredCountries.length} results
            </span>
          </div>

          <p className="mb-3 text-xs text-slate-500">
            Arrow keys and Enter can be used when the list is focused.
          </p>

          {isSearchPending ? (
            <div className="mb-3 h-1 w-full overflow-hidden rounded bg-slate-100">
              <div className="h-full w-1/3 animate-soft-pulse rounded bg-slate-400" />
            </div>
          ) : null}

          {listLoading ? (
            <div className="space-y-2" role="status" aria-label="Loading country list">
              {Array.from({ length: listSkeletonRows }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-11 w-full animate-pulse rounded-xl bg-gradient-to-r from-slate-100 via-slate-200/80 to-slate-100"
                />
              ))}
            </div>
          ) : null}

          {!listLoading && filteredCountries.length === 0 ? (
            <p className="text-sm text-slate-500">No countries match your filters.</p>
          ) : null}

          <div className="transition-opacity duration-200">
            <VirtualizedCountryList
              countries={filteredCountries}
              selectedCountryName={selectedCountryName}
              onSelect={handleCountrySelect}
              isLoading={listLoading}
              height={448}
            />
          </div>
        </aside>

        <CountryDetails
          country={selectedCountry}
          onBorderClick={handleBorderSelect}
          isLoading={detailsLoading}
        />
      </div>
    </section>
  )
}

export default HomePage
