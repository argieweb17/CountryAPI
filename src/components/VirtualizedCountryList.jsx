import { useEffect, useMemo, useRef, useState } from 'react'

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

  return (
    <div
      ref={containerRef}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      className="overflow-auto pr-1"
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
              className={[
                'absolute left-0 right-0 rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors duration-200',
                isActive
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400',
              ].join(' ')}
              style={{ top, height: ROW_HEIGHT - 8 }}
            >
              {country.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default VirtualizedCountryList