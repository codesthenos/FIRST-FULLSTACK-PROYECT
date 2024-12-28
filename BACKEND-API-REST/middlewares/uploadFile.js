import path from 'node:path'
import multer from 'multer'
import { imageTypes, imageMaxSize } from '../lib/consts.js'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(import.meta.dirname, '..', 'public', 'uploadedAddImages'))
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (imageTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    req.fileValidationError = true
    cb(null, false)
  }
}

const limits = { fileSize: imageMaxSize }

export const uploadFile = multer({ storage, fileFilter, limits }).single('image')
