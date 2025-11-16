import { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { HomeOutlined, PictureOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'

const Header = () => {
  const [current, setCurrent] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active menu item based on scroll position
      const sections = ['home', 'gallery', 'about', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrent(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'gallery',
      icon: <PictureOutlined />,
      label: 'Gallery',
    },
    {
      key: 'about',
      icon: <UserOutlined />,
      label: 'About',
    },
    {
      key: 'contact',
      icon: <MailOutlined />,
      label: 'Contact',
    },
  ]

  const handleMenuClick = (e) => {
    setCurrent(e.key)
    const element = document.getElementById(e.key)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* <div className="flex-shrink-0 flex items-center gap-5"> */}
            <img 
              src="/my-logo.png" 
              alt="Arnab's Window Logo" 
              className="h-12 w-auto"
            />
          {/* </div> */}
          <Menu
            mode="horizontal"
            selectedKeys={[current]}
            onClick={handleMenuClick}
            items={menuItems}
            className="bg-transparent border-none flex-1 justify-end"
            style={{ minWidth: 0, flex: 1, justifyContent: 'flex-end' }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header

