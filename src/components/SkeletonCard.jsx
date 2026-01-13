import { motion } from 'framer-motion'

const SkeletonCard = ({ span = 1 }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-800 ${
        span > 1 ? 'md:col-span-2' : ''
      }`}
    >
      <div className="aspect-w-16 aspect-h-12 w-full h-64 md:h-80">
        {/* Shimmer effect */}
        <motion.div
          className="skeleton-shimmer absolute inset-0"
          animate={{
            backgroundPosition: ['200% 0', '-200% 0'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      
      {/* Content placeholder */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}

export default SkeletonCard
