import mongoose from 'mongoose'

const dvlOrdersSchema = mongoose.Schema(
  {
    address: {
      type: String,
    },

    description: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    title: {
      type: String,
    },
    price: {
      type: String,
    },
    date: {
      type: Date,
    },
    files: {
      type: [Object],
    },
  },

  {
    timestamps: true,
  }
)

const dvlOrders = mongoose.model('dvlOrders', dvlOrdersSchema)

export default dvlOrders
