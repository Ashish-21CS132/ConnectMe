const mongoose = require('mongoose')

module.exports = async () => {
  const mongoUri =
    'mongodb+srv://ashish21:5YIzXXdGDSXZMoay@cluster0.bwtm7m7.mongodb.net/?retryWrites=true&w=majority'

  try {
    const connect = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('dbconnect at atlas')
  } catch (error) {
    console.log('found error', error)
    process.exit(1)
  }
}
