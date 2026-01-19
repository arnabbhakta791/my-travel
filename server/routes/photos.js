import express from 'express'
import Photo from '../models/Photo.js'

const router = express.Router()

// GET /api/photos?category=&country=&year=&featured=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { category, country, year, featured, page, limit } = req.query

    const filters = {}
    if (category) filters.category = category
    if (country) filters.country = country
    if (year) filters.year = Number(year)
    if (featured === 'true') filters.featured = true

    const safePage = Math.max(Number(page) || 1, 1)
    const requestedLimit = Number(limit) || 50
    const safeLimit = Math.min(Math.max(requestedLimit, 1), 200)
    const skip = (safePage - 1) * safeLimit

    const [items, total] = await Promise.all([
      Photo.find(filters).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      Photo.countDocuments(filters),
    ])

    return res.json({
      items,
      total,
      page: safePage,
      limit: safeLimit,
    })
  } catch (err) {
    console.error('List photos error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/photos/location-counts
router.get('/location-counts', async (req, res) => {
  try {
    const rows = await Photo.aggregate([
      { $match: { location: { $ne: null, $ne: '' } } },
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $project: { _id: 0, location: '$_id', count: 1 } },
      { $sort: { location: 1 } },
    ])

    const total = rows.reduce((sum, r) => sum + (Number(r.count) || 0), 0)

    return res.json({
      total,
      items: rows,
    })
  } catch (err) {
    console.error('Location counts error:', err)
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


