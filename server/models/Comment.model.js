const { Schema, model } = require('mongoose')

const commentSchema = Schema({
  comment: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

module.exports = model('Comment', comentSchema)