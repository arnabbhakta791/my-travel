import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  DownloadOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TagOutlined,
} from '@ant-design/icons'

const ImageLightbox = ({ photo, photos, currentIndex, isOpen, onClose, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          if (showDetails) {
            setShowDetails(false)
          } else {
            onClose()
          }
          break
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1)
          }
          break
        case 'ArrowRight':
          if (currentIndex < photos.length - 1) {
            onNavigate(currentIndex + 1)
          }
          break
        default:
          break
      }
    },
    [isOpen, currentIndex, photos.length, onClose, onNavigate, showDetails]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Reset states when photo changes
  useEffect(() => {
    if (photo) {
      setIsLoading(true)
      setShowDetails(false)
    }
  }, [photo?._id, photo?.imageUrl])

  const handleDownload = async () => {
    if (!photo) return
    setIsDownloading(true)
    
    try {
      const response = await fetch(photo.imageUrl)
      const blob = await response.blob()
      
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${photo.title?.replace(/[^a-z0-9]/gi, '_') || 'photo'}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Download failed:', error)
      window.open(photo.imageUrl, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrev = (e) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }

  const handleNext = (e) => {
    e.stopPropagation()
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }

  if (!photo) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-3">
            <span className="text-gray-400 text-sm">
              {currentIndex + 1} / {photos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-full transition-colors ${showDetails ? 'bg-travel-blue-base text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails) }}
                title="Photo details"
              >
                <InfoCircleOutlined className="text-lg" />
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-50"
                onClick={(e) => { e.stopPropagation(); handleDownload() }}
                disabled={isDownloading}
                title="Download"
              >
                {isDownloading ? (
                  <LoadingOutlined className="text-lg animate-spin" />
                ) : (
                  <DownloadOutlined className="text-lg" />
                )}
              </button>
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={onClose}
                title="Close (ESC)"
              >
                <CloseOutlined className="text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              className="absolute left-2 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={handlePrev}
            >
              <LeftOutlined className="text-lg sm:text-xl" />
            </button>
          )}

          {currentIndex < photos.length - 1 && (
            <button
              className="absolute right-2 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={handleNext}
            >
              <RightOutlined className="text-lg sm:text-xl" />
            </button>
          )}

          {/* Image - maximized */}
          <motion.img
            src={photo.imageUrl}
            alt={photo.location || 'Photo'}
            className={`max-w-[95vw] max-h-[95vh] object-contain transition-opacity duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            key={photo._id}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />

          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Side drawer for details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-black/60 backdrop-blur-md border-l border-white/10 z-30 overflow-y-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <h3 className="text-white font-medium">Photo Details</h3>
                  <button
                    className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowDetails(false)}
                  >
                    <CloseOutlined />
                  </button>
                </div>

                {/* Drawer content */}
                <div className="p-4 space-y-4">
                  {/* Description */}
                  {photo.description && (
                    <div>
                      <p className="text-gray-300 text-sm leading-relaxed">{photo.description}</p>
                    </div>
                  )}

                  {/* Location info */}
                  <div className="space-y-3 pt-2">
                    {photo.location && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <EnvironmentOutlined className="text-travel-blue-light" />
                        <span className="text-sm">{photo.location}</span>
                      </div>
                    )}
                    
                    {photo.country && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <span className="text-travel-green-light">🌍</span>
                        <span className="text-sm">{photo.country}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageLightbox
