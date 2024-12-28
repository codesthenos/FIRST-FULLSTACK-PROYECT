import express from 'express'
import {
  getAddsController,
  createAddController,
  getAddController,
  updateAddController,
  deleteAddController
} from '../controllers/addsController.js'

export const addsRouter = express.Router()

addsRouter.get('/', getAddsController)
addsRouter.post('/', createAddController)
addsRouter.get('/:id', getAddController)
addsRouter.put('/:id', updateAddController)
addsRouter.delete('/:id', deleteAddController)
