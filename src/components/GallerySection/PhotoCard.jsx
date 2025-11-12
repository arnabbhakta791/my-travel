import { useState } from 'react'
import { Image, Modal } from 'antd'
import { EyeOutlined, EnvironmentOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons'

const PhotoCard = ({ photo, span = 1 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
          span > 1 ? 'md:col-span-2' : ''
        }`}
        onClick={showModal}
      >
        <div className="aspect-w-16 aspect-h-12 w-full h-64 md:h-80 overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-1">{photo.title}</h3>
            <p className="text-sm text-gray-300 mb-2 line-clamp-2">{photo.description}</p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1">
                <EnvironmentOutlined />
                {photo.location}
              </span>
              <span className="flex items-center gap-1">
                <CalendarOutlined />
                {new Date(photo.date).getFullYear()}
              </span>
            </div>
          </div>
          
          {/* View icon */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
            <EyeOutlined className="text-white text-xl" />
          </div>
        </div>

        {/* Featured badge */}
        {photo.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-travel-earth-base to-travel-earth-light text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        style={{ maxWidth: '1200px' }}
        className="photo-modal"
      >
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-2">{photo.title}</h2>
            <p className="text-gray-300 mb-4">{photo.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <EnvironmentOutlined />
                <span>{photo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarOutlined />
                <span>{new Date(photo.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <TagOutlined />
                <span>{photo.category}</span>
              </div>
              <div className="text-gray-400">
                <span className="font-semibold">Year:</span> {photo.year}
              </div>
            </div>
            {photo.tags && photo.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {photo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-travel-blue-dark text-travel-blue-light rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default PhotoCard

