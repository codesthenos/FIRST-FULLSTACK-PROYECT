import express from 'express'
import {
  getAddsController,
  createAddController,
  getAddController,
  updateAddController,
  deleteAddController
} from '../controllers/addsController.js'
import { uploadFile } from '../middlewares/uploadFile.js'

export const addsRouter = express.Router()

addsRouter.get('/', getAddsController)
addsRouter.post('/', uploadFile, createAddController)
addsRouter.get('/:id', getAddController)
addsRouter.put('/:id', uploadFile, updateAddController)
addsRouter.delete('/:id', deleteAddController)
