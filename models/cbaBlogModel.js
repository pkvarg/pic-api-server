import mongoose from 'mongoose'

const cbaBlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    media: {
      type: String,
    },
    text: {
      type: String,
    },
    upcoming: {
      type: Boolean,
    },
    english: {
      type: Boolean,
    },
    link: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
)

const cbaBlog = mongoose.model('cbaBlog', cbaBlogSchema)

export default cbaBlog
