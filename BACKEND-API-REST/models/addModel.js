import mongoose from 'mongoose'

const addSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  price: {
    type: Number,
    min: 0,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  for: {
    type: String,
    enum: ['offer', 'demand'],
    required: true,
    index: true
  },
  tags: {
    type: [String],
    required: true,
    index: true
  },
  image: {
    type: String,
    required: true,
    index: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  }
}, { timestamps: true })

// TODO create the static method to filter, sort etc

export const Add = mongoose.model('Add', addSchema)
