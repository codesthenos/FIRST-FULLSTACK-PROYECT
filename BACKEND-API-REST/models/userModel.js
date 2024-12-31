import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.statics.hashPassword = ({ password }) => bcrypt.hash(password, 10)

userSchema.methods.comparePassword = function ({ password }) {
  return bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)
export const BackupUser = mongoose.model('BackupUser', userSchema)
