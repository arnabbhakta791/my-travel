import { useState, useMemo } from 'react'
import FeaturedPhotos from './FeaturedPhotos'
import FilterBar from './FilterBar'
import PhotoGrid from './PhotoGrid'
import { photos, getUniqueLocations, getUniqueCategories, getUniqueYears } from '../../data/photos'

const GallerySection = () => {
  const [filters, setFilters] = useState({
    location: null,
    category: null,
    year: null,
  })

  const locations = getUniqueLocations()
  const categories = getUniqueCategories()
  const years = getUniqueYears()

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      if (filters.location && photo.country !== filters.location) return false
      if (filters.category && photo.category !== filters.category) return false
      if (filters.year && photo.year !== filters.year) return false
      return true
    })
  }, [filters])

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

        <FeaturedPhotos photos={filteredPhotos} />

        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>

        {filteredPhotos.length > 0 ? (
          <PhotoGrid photos={filteredPhotos} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No photos found matching your filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection

