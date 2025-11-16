import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/HomeSection'
import GallerySection from './components/GallerySection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RequireAuth from './components/RequireAuth'

const App = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add dark class to html element
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-900 text-gray-100">
            <Header />
            <main>
              <HomeSection />
              <GallerySection />
              <AboutSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        }
      />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}

export default App

