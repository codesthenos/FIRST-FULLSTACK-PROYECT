import createHttpError from 'http-errors'
import { User } from '../models/userModel.js'

export const loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const formattedUsername = username.toLowerCase().trim()

    const user = await User.findOne({ username: formattedUsername })

    if (!user || !(await user.comparePassword({ password }))) {
      const error = createHttpError(401, 'Invalid credentials')
      next(error)
      return
    }
    // TODO jwt token sign
    res.json({ jwToken: formattedUsername })
  } catch (error) {
    next(error)
  }
}

export const registerController = (req, res, next) => {
  // TODO
  res.send('registerController')
}

export const deleteUserController = (req, res, next) => {
  // TODO
  res.send('deleteUserController')
}
