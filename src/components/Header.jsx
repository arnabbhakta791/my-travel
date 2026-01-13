import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Drawer, Button } from 'antd'
import { HomeOutlined, PictureOutlined, UserOutlined, MailOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'

const Header = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Get current page from path
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/') return 'home'
    if (path === '/gallery') return 'gallery'
    if (path === '/about') return 'about'
    if (path === '/contact') return 'contact'
    return 'home'
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home', path: '/' },
    { key: 'gallery', icon: <PictureOutlined />, label: 'Gallery', path: '/gallery' },
    { key: 'about', icon: <UserOutlined />, label: 'About', path: '/about' },
    { key: 'contact', icon: <MailOutlined />, label: 'Contact', path: '/contact' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-header shadow-lg' : 'bg-gray-900/50 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/">
              <img
                src="/my-logo.png"
                alt="Arnab's Window Logo"
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  getCurrentPage() === item.key
                    ? 'bg-travel-blue-base/20 text-travel-blue-light'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Button
              type="text"
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={280}
        className="mobile-menu-drawer"
        styles={{
          body: { padding: 0, background: '#111827' },
          header: { display: 'none' },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img
                src="/my-logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white"
            />
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    getCurrentPage() === item.key
                      ? 'bg-travel-blue-base/20 text-travel-blue-light'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </Drawer>

      {/* Animated border line */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-travel-blue-base to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
