import mongoose from 'mongoose'

const md_emailsSchema = mongoose.Schema(
  {
    downloads: { type: String },
  },

  {
    timestamps: true,
  }
)

const Emails = mongoose.model('Emails', md_emailsSchema)

export default Emails
