# NationNode Country Explorer

Responsive React application that fetches and maps country data from the NationNode
API and displays dynamic country profiles.

## Implemented Features

- Data fetched from API using Axios
- Afghanistan loaded by default on startup
- Search countries by name
- Debounced search input for smoother filtering on large datasets
- Filter countries by region
- Filter countries by population range
- Virtualized country list rendering for efficient performance with large results
- Loading skeletons and subtle transition states for list/details panels
- Dynamic country details view including:
  - Name
  - Capital
  - Region and subregion
  - Population
  - Area
  - Coordinates
  - Borders
  - Timezones
  - Currency
  - Languages
  - Flag
- Interactive border countries (click to load border country details)
- Reusable components:
  - Header
  - Footer
  - CountryDetails
  - Flag
  - Borders

## API

- Base URL: https://countries-api-abhishek.vercel.app
- GET /countries
- GET /countries/:countryname

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm run lint:fix
- npm run format
- npm run format:check
- npm run test
- npm run test:watch
- npm run test:coverage

## Environment

Copy .env.example to .env and set:

VITE_API_BASE_URL=https://countries-api-abhishek.vercel.app

## Tech Stack

- React + Vite
- React Router
- Axios
- Tailwind CSS
- ESLint + Prettier
# CountryAPI
