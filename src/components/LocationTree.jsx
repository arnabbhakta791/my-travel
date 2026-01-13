import { motion } from 'framer-motion'
import { EnvironmentOutlined } from '@ant-design/icons'

const LocationTree = ({ locations, selectedLocation, onSelect }) => {
  // Get unique locations from photos
  const uniqueLocations = [...new Set(
    locations
      .map(photo => photo.location)
      .filter(loc => loc != null && loc !== '')
  )].sort()

  const handleSelectAll = () => {
    onSelect(null)
  }

  const handleSelectLocation = (location) => {
    onSelect(location)
  }

  return (
    <div className="space-y-1">
      {/* All Photos option */}
      <button
        onClick={handleSelectAll}
        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
          selectedLocation === null
            ? 'bg-travel-blue-base/20 text-travel-blue-light'
            : 'text-gray-300 hover:bg-gray-800'
        }`}
      >
        <EnvironmentOutlined />
        <span>All Locations</span>
        <span className="text-xs text-gray-500 ml-auto">{locations.length}</span>
      </button>

      {/* Divider */}
      <div className="border-t border-gray-800 my-2" />

      {/* Location list */}
      {uniqueLocations.map((loc) => {
        const count = locations.filter(p => p.location === loc).length
        return (
          <motion.button
            key={loc}
            onClick={() => handleSelectLocation(loc)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              selectedLocation === loc
                ? 'bg-travel-blue-base/20 text-travel-blue-light'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
            }`}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            <span className="text-sm">{loc}</span>
            <span className="text-xs text-gray-500 ml-auto">{count}</span>
          </motion.button>
        )
      })}

      {uniqueLocations.length === 0 && (
        <p className="text-gray-500 text-sm px-3 py-2">No locations found</p>
      )}
    </div>
  )
}

export default LocationTree
