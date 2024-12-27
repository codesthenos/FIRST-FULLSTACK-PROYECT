import express from 'express'
import {
  deleteUserController,
  loginController,
  registerController
} from './controllers/userController.js'
import {
  getAddsController,
  createAddController,
  getAddController,
  updateAddController,
  deleteAddController
} from './controllers/addsController.js'

export const app = express()

// TODO express middlewares

// API ROUTES
// USER CRUD
app.post('/login', loginController)
app.post('/register', registerController)
app.delete('/user/:id', deleteUserController)
// TODO
// app.get('/user/:id', getUserController)
// app.put('/user/:id', updateUserController)
// ADDS CRUD
app.get('/adds', getAddsController)
app.post('/adds', createAddController)
app.get('/adds/:id', getAddController)
app.put('/adds/:id', updateAddController)
app.delete('/adds/:id', deleteAddController)

// TODO error middleware
