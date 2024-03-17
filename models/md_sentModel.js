import mongoose from 'mongoose'

const md_sentSchema = mongoose.Schema(
  {
    attachmentsCount: {
      type: Number,
    },
    downloads: [{ email: { type: String } }],
  },

  {
    timestamps: true,
  }
)

const Attachments = mongoose.model('Attachments', md_sentSchema)

export default Attachments
