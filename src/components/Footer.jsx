import { GithubOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Travel Photo Showcase. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-light transition-colors"
              aria-label="GitHub"
            >
              <GithubOutlined className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-green-light transition-colors"
              aria-label="Instagram"
            >
              <InstagramOutlined className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-light transition-colors"
              aria-label="Twitter"
            >
              <TwitterOutlined className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-travel-blue-base transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinOutlined className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

