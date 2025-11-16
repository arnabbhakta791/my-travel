import express from 'express'
import Photo from '../models/Photo.js'

const router = express.Router()

// GET /api/photos?category=&country=&year=&featured=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { category, country, year, featured, page = 1, limit = 50 } = req.query

    const filters = {}
    if (category) filters.category = category
    if (country) filters.country = country
    if (year) filters.year = Number(year)
    if (featured === 'true') filters.featured = true

    const skip = (Number(page) - 1) * Number(limit)

    const [items, total] = await Promise.all([
      Photo.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Photo.countDocuments(filters),
    ])

    return res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
    })
  } catch (err) {
    console.error('List photos error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const photo = await Photo.findById(id)

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' })
    }

    return res.json(photo)
  } catch (err) {
    console.error('Get photo error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router


