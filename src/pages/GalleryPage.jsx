import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeaturedPhotos from '../components/GallerySection/FeaturedPhotos'
import FilterBar from '../components/GallerySection/FilterBar'
import PhotoGrid from '../components/GallerySection/PhotoGrid'
import ImageLightbox from '../components/ImageLightbox'
import SkeletonCard from '../components/SkeletonCard'
import { apiClient } from '../api/client'

const GalleryPage = () => {
  const [filters, setFilters] = useState({
    location: null,
    category: null,
    year: null,
  })

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await apiClient.get('/photos')
        setPhotos(res.data.items || [])
      } catch (err) {
        console.error('Failed to load photos', err)
        setError('Failed to load photos')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const locations = useMemo(() => {
    return [...new Set(photos.map((p) => p.country).filter((loc) => loc != null && loc !== ''))].sort()
  }, [photos])

  const categories = useMemo(() => {
    return [...new Set(photos.map((p) => p.category).filter((cat) => cat != null && cat !== ''))].sort()
  }, [photos])

  const years = useMemo(() => {
    return [...new Set(photos.map((p) => p.year).filter((year) => year != null && year !== '' && !isNaN(year)))].sort((a, b) => b - a)
  }, [photos])

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      if (filters.location && photo.country !== filters.location) return false
      if (filters.category && photo.category !== filters.category) return false
      if (filters.year && photo.year !== filters.year) return false
      return true
    })
  }, [filters, photos])

  const handleOpenLightbox = (index) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  const handleNavigateLightbox = (index) => {
    setCurrentPhotoIndex(index)
  }

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            Photo Gallery
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my collection of travel photographs from around the world
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            locations={locations}
            categories={categories}
            years={years}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            >
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <p className="text-red-400 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-travel-blue-base text-white rounded-lg hover:bg-travel-blue-light transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeaturedPhotos photos={filteredPhotos} />

              <div className="mb-6 mt-8">
                <motion.p
                  className="text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Showing {filteredPhotos.length}{' '}
                  {filteredPhotos.length === 1 ? 'photo' : 'photos'}
                </motion.p>
              </div>

              {filteredPhotos.length > 0 ? (
                <PhotoGrid
                  photos={filteredPhotos}
                  onOpenLightbox={handleOpenLightbox}
                />
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-gray-400 text-xl">
                    No photos found matching your filters.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <ImageLightbox
          photo={filteredPhotos[currentPhotoIndex]}
          photos={filteredPhotos}
          currentIndex={currentPhotoIndex}
          isOpen={lightboxOpen}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      </div>
    </div>
  )
}

export default GalleryPage
