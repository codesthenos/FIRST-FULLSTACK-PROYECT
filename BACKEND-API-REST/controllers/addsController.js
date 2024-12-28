import createHttpError from 'http-errors'
import { Add } from '../models/addModel.js'

export const getAddsController = async (req, res, next) => {
  // TODO
  try {
    // queryParams
    // userId from jwTokenMiddleware
    const [adds, totalAdds] = await Promise.all([
      Add.find(),
      Add.countDocuments()
    ])
    res.json({ adds, totalAdds })
  } catch (error) {
    next(error)
  }
}

export const createAddController = (req, res, next) => {
  // TODO
  res.send('createAddController')
}

export const getAddController = async (req, res, next) => {
  try {
    const { id } = req.params

    const add = await Add.findById(id)

    if (!add) {
      const error = createHttpError(404, 'Add not found')
      next(error)
      return
    }

    res.json({ add })
  } catch (error) {
    next(error)
  }
}

export const updateAddController = (req, res, next) => {
  // TODO
  res.send('updateAddController')
}

export const deleteAddController = async (req, res, next) => {
  try {
    const { id } = req.params

    const deletedAdd = await Add.findByIdAndDelete(id)

    if (!deletedAdd) {
      const error = createHttpError(404, 'Add not found')
      next(error)
      return
    }

    res.json({ message: 'Add deleted' })
  } catch (error) {
    next(error)
  }
}
