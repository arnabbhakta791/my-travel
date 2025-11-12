import PhotoCard from './PhotoCard'

const PhotoGrid = ({ photos }) => {
  // Create a mixed layout: some photos span 2 columns, others span 1
  const getSpan = (index) => {
    // Every 5th photo (starting from 3rd) spans 2 columns for visual interest
    if ((index + 1) % 5 === 0) return 2
    return 1
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <PhotoCard key={photo.id} photo={photo} span={getSpan(index)} />
      ))}
    </div>
  )
}

export default PhotoGrid

