import mongoose from 'mongoose'

const PhotoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: { type: String, trim: true },
    country: { type: String, trim: true },
    date: { type: Date },
    year: { type: Number },
    category: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String },
  },
  {
    timestamps: true,
  },
)

PhotoSchema.pre('save', function (next) {
  if (this.date && !this.year) {
    this.year = this.date.getFullYear()
  }
  next()
})

const Photo = mongoose.model('Photo', PhotoSchema)

export default Photo


