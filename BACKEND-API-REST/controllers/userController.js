import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
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

    const jwToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.json({ jwToken })
  } catch (error) {
    next(error)
  }
}

export const registerController = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const formattedUsername = username.toLowerCase().trim()
    const hashedPassword = await User.hashPassword({ password })

    const newUser = new User({ username: formattedUsername, password: hashedPassword })

    const savedUser = await newUser.save()

    res.status(201).json({ message: 'User registered', user: savedUser })
  } catch (error) {
    next(error)
  }
}

export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params

    await User.findByIdAndDelete(id)

    res.json({ message: 'User deleted' })
  } catch (error) {
    next(error)
  }
}
