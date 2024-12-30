import path from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import morgan from 'morgan'
import cors from 'cors'
import {
  deleteUserController,
  loginController,
  registerController
} from './controllers/userController.js'
import { addsRouter } from './routers/addsRouter.js'
import { isUserLogged } from './middlewares/userLogged.js'
import { isUserSelf } from './middlewares/userSelf.js'
import { bodyValidator } from './middlewares/validators.js'
import { userZodSchema } from './lib/zodSchemas.js'

export const app = express()

// MAIN MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors({ origin: ['http://localhost:5500', 'http://127.0.0.1:5500'] }))

// USER AUTH
app.post('/login', bodyValidator({ schema: userZodSchema }), loginController)
// USER CRUD
app.post('/register', bodyValidator({ schema: userZodSchema }), registerController)
app.delete('/user/:id', isUserLogged, isUserSelf, deleteUserController)
// TODO app.get('/user/:id', getUserController)
// TODO app.put('/user/:id', updateUserController)

// ADDS ROUTER
app.use('/adds', addsRouter)

// 404 MIDDLEWARE
app.use((req, res, next) => {
  next(createHttpError(404, 'Route not found'))
})
// ERROR MIDDLEWARE
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: error.message })
})
