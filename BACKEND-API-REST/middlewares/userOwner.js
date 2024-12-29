import createHttpError from 'http-errors'
import { Add } from '../models/addModel.js'

export const isUserOwner = async (req, res, next) => {
  try {
    const { id } = req.params

    const add = await Add.findById(id)

    if (!add) {
      const error = createHttpError(404, 'Add not found')
      next(error)
      return
    }

    const owner = add.owner.toString()

    if (req.userId !== owner) {
      const error = createHttpError(403, 'Forbidden')
      next(error)
      return
    }

    next()
  } catch (error) {
    next(error)
  }
}
