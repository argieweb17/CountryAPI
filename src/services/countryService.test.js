import { beforeEach, describe, expect, it, vi } from 'vitest'
import httpClient from './httpClient'
import {
  getAllCountries,
  getApiErrorMessage,
  getCountryByName,
} from './countryService'

vi.mock('./httpClient', () => {
  return {
    default: {
      get: vi.fn(),
    },
  }
})

describe('countryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('gets all countries from payload', async () => {
    const countries = [{ name: 'Afghanistan' }]
    httpClient.get.mockResolvedValue({ data: { data: countries } })

    await expect(getAllCountries()).resolves.toEqual(countries)
    expect(httpClient.get).toHaveBeenCalledWith('/countries')
  })

  it('throws when countries payload is invalid', async () => {
    httpClient.get.mockResolvedValue({ data: { data: {} } })

    await expect(getAllCountries()).rejects.toThrow('Countries payload is invalid.')
  })

  it('gets country by encoded name', async () => {
    const country = { name: 'Bosnia and Herzegovina' }
    httpClient.get.mockResolvedValue({ data: { data: country } })

    await expect(getCountryByName('Bosnia and Herzegovina')).resolves.toEqual(country)
    expect(httpClient.get).toHaveBeenCalledWith(
      '/countries/Bosnia%20and%20Herzegovina'
    )
  })

  it('throws when country name is missing', async () => {
    await expect(getCountryByName('')).rejects.toThrow('Country name is required.')
    expect(httpClient.get).not.toHaveBeenCalled()
  })

  it('returns API error message when available', () => {
    const error = {
      response: {
        data: { message: 'Country not found.' },
      },
    }

    expect(getApiErrorMessage(error)).toBe('Country not found.')
  })

  it('returns fallback status message when message is absent', () => {
    const error = { response: { status: 503 } }

    expect(getApiErrorMessage(error)).toBe('Request failed with status 503.')
  })
})
