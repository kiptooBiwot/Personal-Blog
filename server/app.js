const express = require('express')
const cors = require('cors')
const createErrors = require('http-errors')
const morgan = require('morgan')
require('dotenv').config()
require('./utilities/mongodb.init')

const app = express()
const PORT = process.env.PORT || 3000


// Routes
const authRoutes = require('./router/auth.routes')


// Middleware
// app.use() -URL Parser
app.use(cors())
app.use(morgan('dev'))

app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})