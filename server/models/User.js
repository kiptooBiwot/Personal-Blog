const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  accountActivated: {
    type: Boolean,
    default: false,
    required: true
  }
}, { timestamps: true })

module.exports = model('User', userSchema)