import multer from 'multer'
import cloudinary from '../config/cloudinary.js'
import Photo from '../models/Photo.js'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

const singleUpload = upload.single('image')

const createPhotoWithUpload = (req, res) => {
  singleUpload(req, res, async (err) => {
    try {
      if (err) {
        console.error('Multer error:', err)
        return res.status(400).json({ message: 'Invalid file upload' })
      }

      const file = req.file
      if (!file) {
        return res.status(400).json({ message: 'Image file is required' })
      }

      const { title, description, location, country, date, category, tags, featured } = req.body

      if (!title) {
        return res.status(400).json({ message: 'Title is required' })
      }

      const uploadResult = await cloudinary.uploader.upload_stream(
        {
          folder: 'travel_gallery',
          resource_type: 'image',
        },
        async (cloudErr, result) => {
          if (cloudErr) {
            console.error('Cloudinary upload error:', cloudErr)
            return res.status(500).json({ message: 'Image upload failed' })
          }

          const tagArray =
            typeof tags === 'string' && tags.length > 0
              ? tags.split(',').map((t) => t.trim())
              : []

          const photo = await Photo.create({
            title,
            description,
            location,
            country,
            date: date ? new Date(date) : undefined,
            category,
            tags: tagArray,
            featured: featured === 'true' || featured === true,
            imageUrl: result.secure_url,
            cloudinaryPublicId: result.public_id,
          })

          return res.status(201).json(photo)
        },
      )

      uploadResult.end(file.buffer)
    } catch (uploadError) {
      console.error('Upload controller error:', uploadError)
      return res.status(500).json({ message: 'Server error' })
    }
  })
}

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params
    const photo = await Photo.findById(id)

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    if (photo.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(photo.cloudinaryPublicId)
      } catch (cloudErr) {
        console.error('Cloudinary delete error:', cloudErr)
        // Continue even if Cloudinary delete fails
      }
    }

    await photo.deleteOne()
    return res.json({ message: 'Photo deleted' })
  } catch (err) {
    console.error('Delete photo error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default {
  createPhotoWithUpload,
  deletePhoto,
}


