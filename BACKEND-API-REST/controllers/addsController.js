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

export const createAddController = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      for: forValue,
      tags
    } = req.body

    const userId = req.userId

    const image = req.file ? `/uploadedAddImages/${req.file.filename}` : '/uploadedAddImages/placeholder.jpg'

    const formattedPrice = parseFloat(price)

    const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags

    const newAdd = new Add({
      name,
      price: formattedPrice,
      description,
      for: forValue,
      tags: tagsArray,
      image,
      owner: userId
    })

    const savedAdd = await newAdd.save()

    res.status(201).json({ message: 'Add created', add: savedAdd })
  } catch (error) {
    next(error)
  }
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

export const updateAddController = async (req, res, next) => {
  try {
    const { id } = req.params

    const body = req.body
    const image = req.file ? `/uploadedAddImages/${req.file.filename}` : null

    const addData = {}

    addData.name = body.name
    addData.price = parseFloat(body.price)
    addData.description = body.description
    addData.for = body.for
    addData.tags = typeof body.tags === 'string' ? body.tags.split(',').map(tag => tag.trim()) : body.tags

    if (image) {
      addData.image = image
    }

    const updatedAdd = await Add.findByIdAndUpdate(id, addData, { new: true })

    if (!updatedAdd) {
      const error = createHttpError(404, 'Add not found')
      next(error)
      return
    }

    res.json({ message: 'Add updated', add: updatedAdd })
  } catch (error) {
    next(error)
  }
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
