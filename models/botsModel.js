import mongoose from 'mongoose'

const botsSchema = mongoose.Schema(
  {
    botsCount: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Bots = mongoose.model('Bots', botsSchema)

export default Bots
