import mongoose from 'mongoose'

const visitorsSchema = mongoose.Schema(
  {
    visitorsDeclined: {
      type: Number,
    },
    visitorsAgreed: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Visitors = mongoose.model('Visitors', visitorsSchema)

export default Visitors
