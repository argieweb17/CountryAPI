import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

function AppLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_0%_0%,rgba(15,23,42,0.07),transparent_55%),radial-gradient(40%_35%_at_100%_10%,rgba(148,163,184,0.26),transparent_65%)]" />

      <div className="relative">
        <Header />

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AppLayout
