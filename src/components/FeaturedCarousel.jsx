import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const FeaturedCarousel = ({ photos, onPhotoClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const featuredPhotos = photos.filter(p => p.featured)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredPhotos.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredPhotos.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, featuredPhotos.length])

  if (featuredPhotos.length === 0) return null

  const goToPrev = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev - 1 + featuredPhotos.length) % featuredPhotos.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex(prev => (prev + 1) % featuredPhotos.length)
  }

  const currentPhoto = featuredPhotos[currentIndex]

  const handleClick = () => {
    // Find the index in the original photos array
    const originalIndex = photos.findIndex(p => p._id === currentPhoto._id)
    onPhotoClick?.(originalIndex)
  }

  return (
    <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-800">
      {/* Main image */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 cursor-pointer"
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPhoto._id}
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Photo info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <motion.div
            key={currentPhoto._id + '-info'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-travel-earth-light text-xs font-medium uppercase tracking-wider">
              Featured
            </span>
            {currentPhoto.location && (
              <p className="text-white text-lg sm:text-xl font-semibold mt-1">{currentPhoto.location}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Navigation arrows */}
      {featuredPhotos.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <RightOutlined />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {featuredPhotos.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {featuredPhotos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false)
                setCurrentIndex(idx)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedCarousel
