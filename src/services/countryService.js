import httpClient from './httpClient'

export async function getAllCountries() {
  const response = await httpClient.get('/countries')
  const payload = response?.data?.data

  if (!Array.isArray(payload)) {
    throw new Error('Countries payload is invalid.')
  }

  return payload
}

export async function getCountryByName(countryName) {
  if (!countryName) {
    throw new Error('Country name is required.')
  }

  const encodedName = encodeURIComponent(countryName)
  const response = await httpClient.get(`/countries/${encodedName}`)
  const payload = response?.data?.data

  if (!payload || typeof payload !== 'object') {
    throw new Error('Country payload is invalid.')
  }

  return payload
}

export function getApiErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.response?.status) {
    return `Request failed with status ${error.response.status}.`
  }

  if (error?.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.'
  }

  return 'Unable to load country data. Check your network and API configuration.'
}
