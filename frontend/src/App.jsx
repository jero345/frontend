import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/Cartcontext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EventDetailsSection from './components/EventDetailsSection'
import PastEventCarousel from './components/PastEventCarousel'
import FAQSection from './components/FAQSection'
import PartnersSection from './components/PartnersSection'
import Footer from './components/Footer'
import CartDrawer from './cart/Cartdrawer'
import FloatingCart from './cart/FloatingCart'

// Lazy load del AdminPanel
const AdminPanel = lazy(() => import('./admin/AdminPanel'))

// Componente de loading personalizado
const AdminLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Cargando Panel Admin...</p>
    </div>
  </div>
)

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Ruta Admin con Lazy Loading */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<AdminLoading />}>
                <AdminPanel />
              </Suspense>
            }
          />

          {/* Ruta Principal */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-white overflow-x-hidden relative">
                <Navbar />
                <Hero />
                <EventDetailsSection />
                <PartnersSection />
                <PastEventCarousel />
                <FAQSection />
                <Footer />
                <CartDrawer />
                <FloatingCart />
              </div>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App