import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { EyeOutlined } from '@ant-design/icons'

const PhotoCard = ({ photo, span = 1, index, onOpenLightbox }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleClick = () => {
    onOpenLightbox?.(index)
  }

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl bg-gray-800 cursor-pointer ${
        span > 1 ? 'md:col-span-2' : ''
      }`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -4 }}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Loading skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-travel-blue-base border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Failed to load</span>
          </div>
        )}

        {/* Actual image */}
        <img
          src={photo.imageUrl}
          alt={photo.title || photo.location || 'Photo'}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* View icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <EyeOutlined className="text-white text-xl" />
          </div>
        </div>

        {/* Featured badge */}
        {photo.featured && (
          <div className="absolute top-3 left-3 bg-travel-earth-base/90 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>
    </motion.div>
  )
}

const MemoPhotoCard = memo(PhotoCard)
MemoPhotoCard.displayName = 'PhotoCard'
export default MemoPhotoCard
