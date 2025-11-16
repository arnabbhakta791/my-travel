import mongoose from 'mongoose'

const AdminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const AdminUser = mongoose.model('AdminUser', AdminUserSchema)

export default AdminUser


