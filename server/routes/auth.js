import express from 'express'
import bcrypt from 'bcrypt'
import AdminUser from '../models/AdminUser.js'
import { signToken } from '../utils/jwt.js'

const router = express.Router()

// Optional: initial admin registration (can be disabled in production)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const existing = await AdminUser.findOne({ username })
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await AdminUser.create({ username, passwordHash })

    return res.status(201).json({
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
    })
  } catch (err) {
    console.error('Register error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const user = await AdminUser.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signToken({ id: user._id, username: user.username })
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

export default router


