import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const themeStorageKey = 'countyapi-theme'

function AppLayout() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem(themeStorageKey)

    return storedTheme === 'soft-dark' ? 'soft-dark' : 'light'
  })

  useEffect(() => {
    const isSoftDark = theme === 'soft-dark'
    document.documentElement.classList.toggle('dark', isSoftDark)
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'soft-dark' : 'light'
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden transition-colors duration-300 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_0%_0%,rgba(15,23,42,0.08),transparent_55%),radial-gradient(45%_35%_at_100%_5%,rgba(20,184,166,0.14),transparent_62%),linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(241,245,249,0.62)_100%)] dark:bg-[radial-gradient(70%_45%_at_0%_0%,rgba(15,23,42,0.48),transparent_55%),radial-gradient(45%_35%_at_100%_5%,rgba(45,212,191,0.12),transparent_62%),linear-gradient(180deg,rgba(2,6,23,0.86)_0%,rgba(15,23,42,0.96)_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl dark:bg-emerald-900/25" />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl dark:bg-cyan-900/20" />

      <div className="relative">
        <Header theme={theme} onToggleTheme={toggleTheme} />

        <main className="mx-auto max-w-6xl animate-fade-slide px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
