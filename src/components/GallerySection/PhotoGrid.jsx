import { motion } from 'framer-motion'
import PhotoCard from './PhotoCard'

const PhotoGrid = ({ photos, onOpenLightbox }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo._id}
          photo={photo}
          index={index}
          span={photo.featured ? 2 : 1}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </motion.div>
  )
}

export default PhotoGrid
