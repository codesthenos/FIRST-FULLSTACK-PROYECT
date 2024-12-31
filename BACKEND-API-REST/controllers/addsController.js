import createHttpError from 'http-errors'
import { Add, BackupAdd } from '../models/addModel.js'
import { normalizePrice, normalizeSort } from '../lib/normalizeParams.js'

export const getAddsController = async (req, res, next) => {
  try {
    const queryParams = req.query

    const filter = {}

    if (queryParams.name) filter.name = new RegExp(`^${queryParams.name.trim()}`, 'i')
    if (queryParams.price) filter.price = normalizePrice({ price: queryParams.price })
    if (queryParams.for) filter.for = queryParams.for
    if (queryParams.tags) filter.tags = queryParams.tags
    if (queryParams.owner) filter.owner = queryParams.owner

    const options = {}

    if (queryParams.skip) options.skip = +queryParams.skip
    if (queryParams.limit) options.limit = +queryParams.limit
    if (queryParams.sort) options.sort = normalizeSort(queryParams.sort)
    if (queryParams.fields) options.fields = queryParams.fields

    const [adds, totalAdds] = await Promise.all([
      Add.list({ filter, options }),
      Add.countDocuments(filter)
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

    const add = await Add.findById(id).populate('owner', 'username')

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

    const addToDelete = await Add.findById(id)

    if (!addToDelete) {
      const error = createHttpError(404, 'Add not found')
      next(error)
      return
    }

    const backupAdd = new BackupAdd(addToDelete.toObject())

    await backupAdd.save()

    await Add.findByIdAndDelete(id)

    res.json({ message: 'Add deleted' })
  } catch (error) {
    next(error)
  }
}
