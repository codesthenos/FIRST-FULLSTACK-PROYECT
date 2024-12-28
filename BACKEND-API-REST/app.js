import express from 'express'
import {
  deleteUserController,
  loginController,
  registerController
} from './controllers/userController.js'
import { addsRouter } from './routers/addsRouter.js'

export const app = express()

// TODO express middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// API ROUTES
// USER CRUD
app.post('/login', loginController)
app.post('/register', registerController)
app.delete('/user/:id', deleteUserController)
// TODO
// app.get('/user/:id', getUserController)
// app.put('/user/:id', updateUserController)
// ADDS CRUD
app.use('/adds', addsRouter)

// TODO error middleware
