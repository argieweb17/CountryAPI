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

  const handleCountrySelect = async (countryName) => {
    await loadCountryDetails(countryName)
  }

  const handleBorderSelect = async (borderCountryName) => {
    await loadCountryDetails(borderCountryName)
  }

  return (
    <section className="space-y-6">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
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

          <label className="block">
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

          <label className="block">
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
      </article>

      {errorMessage ? (
        <article className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {errorMessage}
        </article>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-600">
              Countries
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {filteredCountries.length} results
            </span>
          </div>

          {listLoading ? (
            <div className="space-y-2" role="status" aria-label="Loading country list">
              {Array.from({ length: listSkeletonRows }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-10 w-full animate-pulse rounded-lg bg-slate-200/75"
                />
              ))}
            </div>
          ) : null}

          {!listLoading && filteredCountries.length === 0 ? (
            <p className="text-sm text-slate-500">No countries match your filters.</p>
          ) : null}

          <div
            className={[
              'transition-opacity duration-200',
              isSearchPending ? 'opacity-80' : 'opacity-100',
            ].join(' ')}
          >
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
