import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import PhotoGrid from '../components/GallerySection/PhotoGrid'
import ImageLightbox from '../components/ImageLightbox'
import SkeletonCard from '../components/SkeletonCard'
import LocationTree from '../components/LocationTree'
import FeaturedCarousel from '../components/FeaturedCarousel'
import { apiClient } from '../api/client'

const PAGE_SIZE = 24

const GalleryPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadMoreError, setLoadMoreError] = useState(null)
  const [locationStats, setLocationStats] = useState([])
  const [locationTotal, setLocationTotal] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Pagination state
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const sentinelRef = useRef(null)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const fetchPage = useCallback(async (pageToFetch, { replace } = { replace: false }) => {
    const res = await apiClient.get('/photos', {
      params: {
        page: pageToFetch,
        limit: PAGE_SIZE,
      },
    })

    const items = res?.data?.items || []
    const apiTotal = Number(res?.data?.total) || 0

    setTotal(apiTotal)
    setPage(Number(res?.data?.page) || pageToFetch)
    setPhotos((prev) => {
      const next = replace ? items : [...prev, ...items]
      setHasMore(apiTotal > 0 && next.length < apiTotal)
      return next
    })
  }, [])

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setLoading(true)
        setError(null)
        setLoadMoreError(null)
        setHasMore(true)
        setPage(1)
        setTotal(0)
        await fetchPage(1, { replace: true })
      } catch (err) {
        console.error('Failed to load photos', err)
        setError('Failed to load photos')
      } finally {
        setLoading(false)
      }
    }

    loadInitial()
  }, [fetchPage])

  useEffect(() => {
    const loadLocationCounts = async () => {
      try {
        const res = await apiClient.get('/photos/location-counts')
        setLocationStats(res?.data?.items || [])
        setLocationTotal(Number(res?.data?.total) || 0)
      } catch (err) {
        console.error('Failed to load location counts', err)
      }
    }

    loadLocationCounts()
  }, [])

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || !hasMore) return
    try {
      setLoadingMore(true)
      setLoadMoreError(null)
      await fetchPage(page + 1, { replace: false })
    } catch (err) {
      console.error('Failed to load more photos', err)
      setLoadMoreError('Failed to load more photos')
    } finally {
      setLoadingMore(false)
    }
  }, [fetchPage, hasMore, loading, loadingMore, page])

  const locationCountByName = useMemo(() => {
    if (!Array.isArray(locationStats) || locationStats.length === 0) return {}
    return locationStats.reduce((acc, row) => {
      if (row?.location) acc[row.location] = Number(row.count) || 0
      return acc
    }, {})
  }, [locationStats])

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    if (!sentinelEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first?.isIntersecting) loadMore()
      },
      {
        root: null,
        rootMargin: '600px',
        threshold: 0,
      },
    )

    observer.observe(sentinelEl)
    return () => observer.disconnect()
  }, [loadMore])

  const filteredPhotos = useMemo(() => {
    if (!selectedLocation) return photos
    return photos.filter((photo) => photo.location === selectedLocation)
  }, [selectedLocation, photos])

  // When a location is selected, keep loading pages until we have all photos for that location.
  // This ensures the sidebar total count matches what the grid can show.
  useEffect(() => {
    if (!selectedLocation) return
    const targetCount = locationCountByName[selectedLocation]
    if (!targetCount) return

    if (loading || loadingMore || !hasMore) return
    if (filteredPhotos.length >= targetCount) return

    loadMore()
  }, [filteredPhotos.length, hasMore, loading, loadingMore, loadMore, locationCountByName, selectedLocation])

  const handleOpenLightbox = useCallback((index) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handleNavigateLightbox = useCallback((index) => {
    setCurrentPhotoIndex(index)
  }, [])

  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location)
    setMobileSidebarOpen(false)
  }, [])

  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden md:block flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'}`}>
          <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-850 border-r border-gray-800 overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Locations</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  <CloseOutlined />
                </button>
              </div>
              <LocationTree
                locations={photos}
                locationStats={locationStats}
                totalCount={locationTotal || total}
                selectedLocation={selectedLocation}
                onSelect={handleLocationSelect}
              />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Toggle sidebar button (desktop) */}
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="hidden md:flex p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <MenuOutlined />
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MenuOutlined />
              </button>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedLocation || 'All Photos'}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
                  {selectedLocation ? (
                    <span className="text-gray-500"> (loaded {photos.length}/{total} total)</span>
                  ) : (
                    total > 0 && <span className="text-gray-500"> (loaded {photos.length}/{total})</span>
                  )}
                </p>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {[...Array(8)].map((_, i) => (
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
                  {/* Featured Carousel - only when showing all locations */}
                  {selectedLocation === null && (
                    <FeaturedCarousel
                      photos={filteredPhotos}
                      onPhotoClick={handleOpenLightbox}
                    />
                  )}

                  {filteredPhotos.length > 0 ? (
                    <>
                      <PhotoGrid
                        photos={filteredPhotos}
                        onOpenLightbox={handleOpenLightbox}
                      />

                      <div className="mt-10">
                        {loadMoreError && (
                          <div className="text-center">
                            <p className="text-red-400">{loadMoreError}</p>
                            <button
                              type="button"
                              onClick={loadMore}
                              className="mt-3 px-5 py-2 bg-travel-blue-base text-white rounded-lg hover:bg-travel-blue-light transition-colors"
                            >
                              Retry
                            </button>
                          </div>
                        )}

                        {loadingMore && (
                          <div className="flex items-center justify-center gap-3 text-gray-400 mt-8">
                            <div className="w-5 h-5 border-2 border-travel-blue-base border-t-transparent rounded-full animate-spin" />
                            <span>Loading more photos…</span>
                          </div>
                        )}

                        {hasMore && !loadingMore && !loadMoreError && (
                          <div className="text-center mt-8">
                            <button
                              type="button"
                              onClick={loadMore}
                              className="px-6 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                            >
                              Load more
                            </button>
                          </div>
                        )}

                        {!hasMore && !loadingMore && total > 0 && (
                          <p className="text-center text-gray-500 mt-8">
                            You’ve reached the end.
                          </p>
                        )}

                        <div ref={sentinelRef} className="h-1" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-gray-400 text-xl">No photos found for this location.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-gray-900 border-r border-gray-800 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Locations</h2>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <CloseOutlined />
                  </button>
                </div>
                <LocationTree
                  locations={photos}
                  locationStats={locationStats}
                  totalCount={locationTotal || total}
                  selectedLocation={selectedLocation}
                  onSelect={handleLocationSelect}
                />
              </div>
            </motion.div>
          </>
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
  )
}

export default GalleryPage
