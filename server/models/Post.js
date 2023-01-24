const { Schema, model } = require('mongoose')

const postSchema = Schema({
  title: {
    type: String,
    requried: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    requried: true
  },
  slug: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [{
    type: String,
    requried: false,
    default: ''
  }],
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
}, { timestamps: true })

module.exports = model('Post', postSchema)