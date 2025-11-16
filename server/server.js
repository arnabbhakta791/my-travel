import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import photoRoutes from './routes/photos.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_gallery'

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Basic middleware
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }))
// app.use(express.json())

// CORS configuration - normalize origins to handle trailing slashes
const normalizeOrigin = (origin) => {
  if (!origin) return null
  return origin.replace(/\/$/, '') // Remove trailing slash
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      
      const normalizedOrigin = normalizeOrigin(origin)
      const allowedOrigin = normalizeOrigin(process.env.CLIENT_ORIGIN || 'http://localhost:5173')
      
      // Also allow localhost for development
      const isLocalhost = normalizedOrigin?.includes('localhost')
      const isAllowed = normalizedOrigin === allowedOrigin || isLocalhost
      
      if (isAllowed) {
        callback(null, true)
      } else {
        console.log('CORS blocked:', normalizedOrigin, 'Expected:', allowedOrigin)
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/photos', photoRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Mongo connection and server start
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })


