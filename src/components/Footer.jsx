import { Link } from 'react-router-dom'
import { GithubOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-gray-400 hover:text-travel-blue-light transition-colors">
              Home
            </Link>
            <Link to="/gallery" className="text-gray-400 hover:text-travel-blue-light transition-colors">
              Gallery
            </Link>
            <Link to="/about" className="text-gray-400 hover:text-travel-blue-light transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-travel-blue-light transition-colors">
              Contact
            </Link>
          </nav>

          {/* Social Links */}
          <div className="flex space-x-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-light transition-colors"
              aria-label="GitHub"
            >
              <GithubOutlined className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-green-light transition-colors"
              aria-label="Instagram"
            >
              <InstagramOutlined className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-light transition-colors"
              aria-label="Twitter"
            >
              <TwitterOutlined className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-base transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinOutlined className="text-xl" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Arnab's Window. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
