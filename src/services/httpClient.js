import axios from 'axios'

const httpClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'https://countries-api-abhishek.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
