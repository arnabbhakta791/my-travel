import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import AdminUser from '../models/AdminUser.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_gallery'

// Get username and password from command line arguments
const username = process.argv[2]
const password = process.argv[3]

if (!username || !password) {
  console.error('Usage: node server/scripts/seedAdmin.js <username> <password>')
  console.error('Example: node server/scripts/seedAdmin.js admin mypassword123')
  process.exit(1)
}

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')

    // Check if user already exists
    const existing = await AdminUser.findOne({ username })
    if (existing) {
      console.log(`Admin user "${username}" already exists.`)
      console.log('If you want to update the password, delete the user first or use a different username.')
      await mongoose.connection.close()
      process.exit(0)
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create admin user
    const user = await AdminUser.create({ username, passwordHash })

    console.log('✅ Admin user created successfully!')
    console.log(`   Username: ${user.username}`)
    console.log(`   ID: ${user._id}`)
    console.log(`   Created at: ${user.createdAt}`)

    await mongoose.connection.close()
    console.log('Database connection closed.')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding admin user:', error)
    await mongoose.connection.close()
    process.exit(1)
  }
}

seedAdmin()



