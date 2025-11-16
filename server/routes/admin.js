import express from 'express'
import { authMiddleware } from '../middleware/auth.js'
import uploadController from '../controllers/uploadController.js'
import Photo from '../models/Photo.js'

const router = express.Router()

// All admin routes are protected
router.use(authMiddleware)

// Create new photo with image upload
router.post('/photos', uploadController.createPhotoWithUpload)

// Update photo metadata (not image)
router.put('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updates = { ...req.body }

    // If date is being updated, recalculate year
    if (updates.date) {
      const dateObj = new Date(updates.date)
      updates.year = dateObj.getFullYear()
    }

    const photo = await Photo.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    return res.json(photo)
  } catch (err) {
    console.error('Update photo error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Delete photo (and optionally Cloudinary resource)
router.delete('/photos/:id', uploadController.deletePhoto)

// Optional: admin check endpoint
router.get('/me', (req, res) => {
  return res.json({ user: req.user })
})

export default router


