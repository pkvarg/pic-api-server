import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)
  },
})

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg||jpeg|png|mp3|pdf|txt|doc|docx/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Wrong file type!')
  }
}
const upload = multer({ storage, fileFilter })

export default upload
