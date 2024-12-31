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

addSchema.statics.list = ({ filter, options }) => {
  return Add.find(filter)
    .populate('owner', 'username')
    .skip(options.skip)
    .limit(options.limit)
    .sort(options.sort)
    .select(options.fields)
    .exec()
}

export const Add = mongoose.model('Add', addSchema)
export const BackupAdd = mongoose.model('BackupAdd', addSchema)
