import { useEffect, useMemo, useRef, useState } from 'react'
import { applyRipple } from '../utils/ripple'

const ROW_HEIGHT = 48
const OVERSCAN_COUNT = 6

function VirtualizedCountryList({
  countries,
  selectedCountryName,
  onSelect,
  isLoading,
  height = 448,
}) {
  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)

  const totalRows = countries.length
  const visibleCount = Math.ceil(height / ROW_HEIGHT)

  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN_COUNT)
    const end = Math.min(totalRows, start + visibleCount + OVERSCAN_COUNT * 2)

    return { startIndex: start, endIndex: end }
  }, [scrollTop, totalRows, visibleCount])

  const visibleItems = useMemo(
    () => countries.slice(startIndex, endIndex),
    [countries, endIndex, startIndex]
  )

  const selectedIndex = useMemo(
    () => countries.findIndex((country) => country.name === selectedCountryName),
    [countries, selectedCountryName]
  )

  useEffect(() => {
    const activeIndex = countries.findIndex(
      (country) => country.name === selectedCountryName
    )

    if (activeIndex < 0 || !containerRef.current) {
      return
    }

    const top = activeIndex * ROW_HEIGHT
    const bottom = top + ROW_HEIGHT
    const viewportTop = containerRef.current.scrollTop
    const viewportBottom = viewportTop + height

    if (top < viewportTop || bottom > viewportBottom) {
      containerRef.current.scrollTo({
        top: Math.max(0, top - height / 2 + ROW_HEIGHT),
        behavior: 'smooth',
      })
    }
  }, [countries, height, selectedCountryName])

  if (isLoading) {
    return null
  }

  if (totalRows === 0) {
    return null
  }

  const handleListKeyDown = (event) => {
    if (totalRows === 0) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex =
        selectedIndex < 0 ? 0 : Math.min(totalRows - 1, selectedIndex + 1)
      onSelect(countries[nextIndex].name)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const nextIndex = selectedIndex <= 0 ? 0 : selectedIndex - 1
      onSelect(countries[nextIndex].name)
      return
    }

    if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault()
      onSelect(countries[selectedIndex].name)
    }
  }

  return (
    <div
      ref={containerRef}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      onKeyDown={handleListKeyDown}
      tabIndex={0}
      role="listbox"
      aria-label="Countries"
      className="overflow-auto rounded-2xl bg-slate-50/50 p-1 pr-1 shadow-inner outline-none transition focus:ring-2 focus:ring-slate-200 dark:bg-slate-900/50 dark:focus:ring-teal-950/60"
      style={{ height }}
    >
      <div style={{ height: totalRows * ROW_HEIGHT, position: 'relative' }}>
        {visibleItems.map((country, index) => {
          const actualIndex = startIndex + index
          const top = actualIndex * ROW_HEIGHT
          const isActive = country.name === selectedCountryName

          return (
            <button
              key={country.name}
              type="button"
              onClick={() => onSelect(country.name)}
              onPointerDown={applyRipple}
              role="option"
              aria-selected={isActive}
              className={[
                'absolute left-0 right-0 isolate overflow-hidden rounded-xl px-3 py-2 text-left text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-300/40 dark:bg-teal-500/20 dark:text-teal-50 dark:shadow-teal-950/60'
                  : 'bg-white text-slate-700 hover:-translate-y-0.5 hover:shadow-sm dark:bg-slate-900 dark:text-slate-200 dark:hover:text-white',
              ].join(' ')}
              style={{
                top,
                height: ROW_HEIGHT - 8,
                position: 'absolute',
                left: 0,
                right: 0,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">{country.name}</span>
                {country.region ? (
                  <span
                    className={[
                      'rounded-md px-2 py-0.5 text-[11px] font-semibold',
                      isActive
                        ? 'bg-white/20 text-white dark:bg-white/15'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                    ].join(' ')}
                  >
                    {country.region}
                  </span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default VirtualizedCountryList