import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined, EnvironmentOutlined } from '@ant-design/icons'

const FeaturedPhotos = ({ photos }) => {
  const featuredPhotos = photos.filter(photo => photo.featured)

  if (featuredPhotos.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-travel-blue-light to-travel-green-light bg-clip-text text-transparent">
        Featured Destinations
      </h2>
      <Carousel
        autoplay
        autoplaySpeed={4000}
        dots={true}
        arrows={true}
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        className="featured-carousel"
      >
        {featuredPhotos.map((photo) => (
          <div key={photo.id} className="relative">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <h3 className="text-3xl md:text-5xl font-bold mb-3">{photo.title}</h3>
                  <p className="text-lg md:text-xl text-gray-200 mb-4 max-w-2xl">
                    {photo.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm md:text-base">
                    <span className="flex items-center gap-2">
                      <EnvironmentOutlined />
                      {photo.location}
                    </span>
                    <span>{new Date(photo.date).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default FeaturedPhotos

