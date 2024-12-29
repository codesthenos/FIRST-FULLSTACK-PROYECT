import z from 'zod'
import createHttpError from 'http-errors'
import { querySchema } from '../lib/zodSchemas.js'

const errorHandler = ({ error }) => {
  if (error instanceof z.ZodError) {
    const errorMessage = `Zod error: ${error.errors.map(error => error.message).join(' | ')}`
    const customError = createHttpError(400, errorMessage)

    return customError
  }
  return error
}

export const bodyValidator = ({ schema }) => (req, res, next) => {
  try {
    schema.parse(req.body)

    next()
  } catch (error) {
    next(errorHandler({ error }))
  }
}

export const queryValidator = (req, res, next) => {
  try {
    querySchema.parse(req.query)

    next()
  } catch (error) {
    next(errorHandler({ error }))
  }
}
