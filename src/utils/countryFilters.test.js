import { describe, expect, it } from 'vitest'
import { filterCountries, matchesPopulationFilter } from './countryFilters'

const countries = [
  {
    name: 'Brazil',
    region: 'Americas',
    population: 203080756,
  },
  {
    name: 'Afghanistan',
    region: 'Asia',
    population: 40218234,
  },
  {
    name: 'Albania',
    region: 'Europe',
    population: 2837743,
  },
  {
    name: 'Algeria',
    region: 'Africa',
    population: 45606481,
  },
]

describe('matchesPopulationFilter', () => {
  it('returns true for all when no specific filter is selected', () => {
    expect(matchesPopulationFilter(1000, 'all')).toBe(true)
  })

  it('matches values in each filter bucket', () => {
    expect(matchesPopulationFilter(5000000, 'lt10m')).toBe(true)
    expect(matchesPopulationFilter(32000000, '10mTo50m')).toBe(true)
    expect(matchesPopulationFilter(150000000, '50mTo200m')).toBe(true)
    expect(matchesPopulationFilter(250000000, 'gt200m')).toBe(true)
  })

  it('returns false when outside the selected bucket', () => {
    expect(matchesPopulationFilter(9000000, '10mTo50m')).toBe(false)
    expect(matchesPopulationFilter(220000000, '50mTo200m')).toBe(false)
    expect(matchesPopulationFilter(150000000, 'gt200m')).toBe(false)
  })
})

describe('filterCountries', () => {
  it('applies search, region, and population filters together', () => {
    const result = filterCountries(countries, {
      searchTerm: 'al',
      regionFilter: 'Africa',
      populationFilter: '10mTo50m',
    })

    expect(result).toEqual([
      {
        name: 'Algeria',
        region: 'Africa',
        population: 45606481,
      },
    ])
  })

  it('returns results sorted by name', () => {
    const result = filterCountries(countries, {
      searchTerm: 'a',
      regionFilter: 'all',
      populationFilter: 'all',
    })

    expect(result.map((country) => country.name)).toEqual([
      'Afghanistan',
      'Albania',
      'Algeria',
      'Brazil',
    ])
  })
})
