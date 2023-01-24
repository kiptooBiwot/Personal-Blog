const express = require('express')
const cors = require('cors')
const createErrors = require('http-errors')
const morgan = require('morgan')
require('dotenv').config()
require('./utilities/mongodb.init')

const app = express()
const PORT = process.env.PORT || 3000

// Authorization
const authJwt = require('./utilities/jwt')

// Routes
const authRoutes = require('./router/auth.routes')
const userRoutes = require('./router/user.routes')
const postRoutes = require('./router/post.routes')
const categoryRoutes = require('./router/category.routes')


// Middleware
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'))
app.use(authJwt())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/article', postRoutes)
app.use('/api/v1/category', categoryRoutes)

// Error response
app.use((err, req, res, next) => {
  const errStatus = err.status || 500
  const errMessage = err.message || 'Something went wrong'
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})