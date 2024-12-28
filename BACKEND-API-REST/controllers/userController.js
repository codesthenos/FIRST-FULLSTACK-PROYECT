import { User } from '../models/userModel.js'

export const loginController = async (req, res, next) => {
  // TODO
  try {
    const { username, password } = req.body

    const formattedUsername = username.toLowerCase().trim()

    const user = await User.findOne({ username: formattedUsername })

    if (!user || !(await user.comparePassword({ password }))) {
      // abstract this to the error middleware using next(error)
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    // jwt token sign
    res.json({ jwToken: formattedUsername })
  } catch (error) {
    // abstract this to the error middleware using next(error)
    return res.status(500).json({ error: error.message })
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
