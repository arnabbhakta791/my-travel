import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSection from './components/HomeSection'
import GallerySection from './components/GallerySection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

const App = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add dark class to html element
    document.documentElement.classList.add('dark')
  }, [])

  return (
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
  )
}

export default App

