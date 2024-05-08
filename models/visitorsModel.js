import mongoose from 'mongoose'

const visitorsSchema = mongoose.Schema(
  {
    visitorsDeclined: {
      type: Number,
    },
    visitorsAgreed: {
      type: Number,
    },
    visitorsCestaZivota: {
      type: Number,
    },
    visitorsKatolicka: {
      type: Number,
    },
    visitorsSvedkovia: {
      type: Number,
    },

    visitorsGender: {
      type: Number,
    },

    visitorsDeclinedIo: {
      type: Number,
    },
    visitorsAgreedIo: {
      type: Number,
    },
    visitorsMd: {
      type: Number,
    },
    visitorsCba: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
)

const Visitors = mongoose.model('Visitors', visitorsSchema)

export default Visitors
