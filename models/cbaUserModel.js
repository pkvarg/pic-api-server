import mongoose from 'mongoose'

const cbaUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hashedPassword: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
)

const cbaUser = mongoose.model('cbaUser', cbaUserSchema)

export default cbaUser
