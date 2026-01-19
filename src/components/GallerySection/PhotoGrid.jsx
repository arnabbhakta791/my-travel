import { memo } from 'react'
import PhotoCard from './PhotoCard'

const PhotoGrid = ({ photos, onOpenLightbox }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo._id}
          photo={photo}
          index={index}
          onOpenLightbox={onOpenLightbox}
        />
      ))}
    </div>
  )
}

const MemoPhotoGrid = memo(PhotoGrid)
MemoPhotoGrid.displayName = 'PhotoGrid'
export default MemoPhotoGrid
