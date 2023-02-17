const jwt = require('jsonwebtoken')
const User = require('../models/User')
const createError = require('http-errors')

module.exports = {
  protect: async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        // Get the token from the auth header
        token = req.headers.authorization.split(' ')[1]

        // console.log('MIDDLEWARE TOKEN: ', token);

        // Verify the token
        const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY)

        // Get the User who sign in from the token
        req.user = await User.findById(verifiedToken.id).select('-password')

        next()
      } catch (error) {
        console.log(error)
        // throw createError[401]('Not authorized')
        next(error)
        // res.status(401)
        // throw new Error('Not authorized')
      }
    }

    if (!token) {
      throw createError[401]('Not authorized.Please log in to acccess this resource.')
      // res.status(401)
      // throw new Error('Not authorized. Please log in to acccess this resource.')
    }
  }
}
