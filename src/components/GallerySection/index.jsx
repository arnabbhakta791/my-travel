import { useEffect, useMemo, useState } from 'react'
import FeaturedPhotos from './FeaturedPhotos'
import FilterBar from './FilterBar'
import PhotoGrid from './PhotoGrid'
import { apiClient } from '../../api/client'

const GallerySection = () => {
  const [filters, setFilters] = useState({
    location: null,
    category: null,
    year: null,
  })

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await apiClient.get('/photos')
        setPhotos(res.data.items || [])
      } catch (err) {
        // eslint-disable-next-line no-console
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

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-travel-blue-light via-travel-green-base to-travel-earth-light bg-clip-text text-transparent">
            Photo Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my collection of travel photographs from around the world
          </p>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          locations={locations}
          categories={categories}
          years={years}
        />

        {loading && (
          <div className="text-center py-10 text-gray-400">Loading photos...</div>
        )}

        {error && !loading && (
          <div className="text-center py-10 text-red-400">{error}</div>
        )}

        {!loading && !error && (
          <>
            <FeaturedPhotos photos={filteredPhotos} />

            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredPhotos.length}{' '}
                {filteredPhotos.length === 1 ? 'photo' : 'photos'}
              </p>
            </div>

            {filteredPhotos.length > 0 ? (
              <PhotoGrid photos={filteredPhotos} />
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">No photos found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default GallerySection

