const { userControllers } = require("./user.controllers")
const User = require('../models/User')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const jwt = require('jsonwebtoken')

module.exports.authControllers = {
  registerUser: async (req, res, next) => {
    try {
      console.log('USER FROM THE FRONTEND: ' + req.body);
      const userExists = await User.findOne({ email: req.body.email })

      if (userExists) throw createError.Conflict('The email is already taken. You may want to log in.')
      // Encrypt password
      const hashedPassword = await bcrypt.hash(req.body.password, 12)

      const newUser = User({
        ...req.body,
        password: hashedPassword,
      })

      const savedUser = await newUser.save()
      res.json({ message: 'Registation completed successfully. Login to poceed.', user: savedUser })
    } catch (error) {
      return next(error)
    }
  },

  loginUser: async (req, res, next) => {
    // const { email, password } = req.body
    try {
      const user = await User.findOne({ email: req.body.email })

      if (!user) throw createError(400, 'User not registered!')

      // if user compare passwords
      const isValidUser = await bcrypt.compare(req.body.password, user.password)

      if (!isValidUser) throw createError(401, 'Invalid email and/or password')

      // create a token
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY)

      // Send all other fields without the password
      const { password, ...others } = user._doc

      res.header(token).json({ message: 'Login Successful', token, user: others })
    } catch (error) {
      return next(error)
    }
  }
}