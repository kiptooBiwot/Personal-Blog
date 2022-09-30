const { Schema, model } = require('mongoose')

const categorySchema = Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: true })

module.exports = model('Category', categorySchema)