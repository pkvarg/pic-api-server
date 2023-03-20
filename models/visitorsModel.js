import mongoose from 'mongoose'

const visitorsSchema = mongoose.Schema(
  {
    visitorsDeclined: {
      type: Number,
    },
    visitorsAgreed: {
      type: Number,
    },
    visitorsDeclinedDvl: {
      type: Number,
    },
    visitorsAgreedDvl: {
      type: Number,
    },
    visitorsDeclinedIo: {
      type: Number,
    },
    visitorsAgreedIo: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Visitors = mongoose.model('Visitors', visitorsSchema)

export default Visitors
