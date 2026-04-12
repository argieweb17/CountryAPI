export function matchesPopulationFilter(population, filterValue) {
  const value = Number(population) || 0

  switch (filterValue) {
    case 'lt10m':
      return value < 10000000
    case '10mTo50m':
      return value >= 10000000 && value <= 50000000
    case '50mTo200m':
      return value > 50000000 && value <= 200000000
    case 'gt200m':
      return value > 200000000
    default:
      return true
  }
}

export function filterCountries(countries, filters) {
  const {
    searchTerm = '',
    regionFilter = 'all',
    populationFilter = 'all',
  } = filters

  const normalizedSearch = searchTerm.trim().toLowerCase()

  return countries
    .filter((country) => {
      const name = (country.name || '').toLowerCase()
      const regionMatch = regionFilter === 'all' || country.region === regionFilter

      return (
        name.includes(normalizedSearch) &&
        regionMatch &&
        matchesPopulationFilter(country.population, populationFilter)
      )
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
