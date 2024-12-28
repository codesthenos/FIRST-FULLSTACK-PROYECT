import path from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import {
  deleteUserController,
  loginController,
  registerController
} from './controllers/userController.js'
import { addsRouter } from './routers/addsRouter.js'
import { isUserLogged } from './middlewares/userLogged.js'
import { isUserSelf } from './middlewares/userSelf.js'

export const app = express()

// MAIN MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(cookieParser())

// API ROUTES
// USER AUTH
app.post('/login', /* validationBodyMiddleware */ loginController)
// USER CRUD
app.post('/register', /* validationBodyMiddleware */ registerController)
app.delete('/user/:id', isUserLogged, isUserSelf, deleteUserController)
// TODO
// app.get('/user/:id', getUserController)
// app.put('/user/:id', updateUserController)
// ADDS CRUD
app.use('/adds', addsRouter)

// ERROR HANDLING
app.use((req, res, next) => {
  next(createHttpError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})
