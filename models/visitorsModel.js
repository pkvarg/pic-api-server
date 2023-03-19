import mongoose from 'mongoose'

const visitorsSchema = mongoose.Schema(
  {
    visitorsCount: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Visitors = mongoose.model('Visitors', visitorsSchema)

export default Visitors
