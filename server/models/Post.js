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
  photo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    requried: true,
  },
  categories: {
    type: Array,
    required: false,
  }
}, { timestamps: true })

module.exports = model('Post', postSchema)