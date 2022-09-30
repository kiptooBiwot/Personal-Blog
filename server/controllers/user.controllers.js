const createError = require("http-errors")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const Post = require("../models/Post")

module.exports.userControllers = {
  updateUser: async (req, res, next) => {

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      // console.log(updatedUser)

      if (!updatedUser) throw createError(400, 'The account details were not updated')

      const { password, ...userDetails } = updatedUser._doc

      res.json({ msg: 'Account details updated', ...userDetails })
    } catch (error) {
      return next(error)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({ msg: 'User deleted.' })
    } catch (error) {
      return next(error)
    }
  },

  // Delete user plus content endpoint
  deleteUserPlusArticles: async (req, res, next) => {
    try {
      await Post.deleteMany({ _id: req.params.id })
      await User.findByIdAndDelete(req.params.id)

      res.json({ msg: 'The user and their articles have been deleted' })
    } catch (error) {
      return next(error)
    }
  },


  // GET USER
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)

      if (!user) throw createError(404, 'User not found.')

      // Get user fields minus the password field
      const { password, ...userProfile } = user._doc
      res.json(userProfile)
    } catch (error) {
      return next(error)
    }
  }

}