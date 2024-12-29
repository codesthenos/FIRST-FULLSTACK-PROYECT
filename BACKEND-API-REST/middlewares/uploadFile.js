import path from 'node:path'
import multer from 'multer'
import { imageTypes, imageMaxSize } from '../lib/consts.js'
import createHttpError from 'http-errors'

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
    const error = createHttpError(415, 'Not supported file type. Supported ones jpg, jpeg, png, gif and webp')
    cb(error, false)
  }
}

const limits = { fileSize: imageMaxSize }

export const uploadFile = multer({ storage, fileFilter, limits }).single('image')
