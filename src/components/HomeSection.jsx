import { Button } from 'antd'
import { ArrowDownOutlined } from '@ant-design/icons'

const HomeSection = () => {
  const scrollToGallery = () => {
    const element = document.getElementById('gallery')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-travel-blue-dark via-gray-900 to-travel-green-dark opacity-90"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop')",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent animate-fade-in">
          My Travel Journey
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Exploring the world, one photograph at a time. Discover breathtaking landscapes,
          vibrant cultures, and unforgettable moments from my adventures around the globe.
        </p>
        <Button
          type="primary"
          size="large"
          icon={<ArrowDownOutlined />}
          onClick={scrollToGallery}
          className="bg-gradient-to-r from-travel-blue-base to-travel-green-base border-none hover:from-travel-blue-light hover:to-travel-green-light h-12 px-8 text-lg font-semibold"
        >
          Explore Gallery
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDownOutlined className="text-3xl text-gray-400" />
      </div>
    </section>
  )
}

export default HomeSection

