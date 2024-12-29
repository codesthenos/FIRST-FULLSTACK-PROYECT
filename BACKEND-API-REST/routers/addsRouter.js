import express from 'express'
import {
  getAddsController,
  createAddController,
  getAddController,
  updateAddController,
  deleteAddController
} from '../controllers/addsController.js'
import { uploadFile } from '../middlewares/uploadFile.js'
import { isUserLogged } from '../middlewares/userLogged.js'
import { bodyValidator } from '../middlewares/validators.js'
import { addZodSchema } from '../lib/zodSchemas.js'

export const addsRouter = express.Router()

addsRouter.use(isUserLogged)

addsRouter.get('/', getAddsController)
addsRouter.post('/', uploadFile, bodyValidator({ schema: addZodSchema }), createAddController)
addsRouter.get('/:id', getAddController)
addsRouter.put('/:id', /* isownermiddleware */ uploadFile, bodyValidator({ schema: addZodSchema }), updateAddController)
addsRouter.delete('/:id', /* isownermiddleware */ deleteAddController)
