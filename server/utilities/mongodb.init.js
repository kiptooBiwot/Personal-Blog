const mongoose = require('mongoose')

mongoose.set("strictQuery", false)
// DB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected....')
}).catch(err => console.log(err.message))

mongoose.connection.on('connected', () => {
  console.log('Database connection established!')
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected!')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})