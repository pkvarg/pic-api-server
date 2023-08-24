import mongoose from 'mongoose'

const MultiFilesSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    files: {
      required: true,
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
)
const dvlMultiFiles = mongoose.model('MultiFiles', MultiFilesSchema)
export default dvlMultiFiles
