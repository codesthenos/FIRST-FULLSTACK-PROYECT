import z from 'zod'
import createHttpError from 'http-errors'
import { userZodSchema } from '../lib/zodSchemas.js'

export const userValidator = (req, res, next) => {
  try {
    userZodSchema.parse(req.body)

    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = `Zod error: ${error.errors.map(error => error.message).join(' | ')}`
      const customError = createHttpError(401, errorMessage)
      next(customError)
      return
    }

    next(error)
  }
}
