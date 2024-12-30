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
import { bodyValidator, queryValidator } from '../middlewares/validators.js'
import { addZodSchema } from '../lib/zodSchemas.js'
import { isUserOwner } from '../middlewares/userOwner.js'

export const addsRouter = express.Router()
// I dont want the get adds routes to be auth thats why its before the isUserLogged
addsRouter.get('/', queryValidator, getAddsController)
addsRouter.get('/:id', getAddController)

addsRouter.use(isUserLogged)

addsRouter.post('/', uploadFile, bodyValidator({ schema: addZodSchema }), createAddController)
addsRouter.put('/:id', isUserOwner, uploadFile, bodyValidator({ schema: addZodSchema }), updateAddController)
addsRouter.delete('/:id', isUserOwner, deleteAddController)
