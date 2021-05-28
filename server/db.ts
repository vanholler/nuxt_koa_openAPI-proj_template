const mongoose = require('mongoose')
mongoose.Promise = Promise
mongoose.set('debug', true)

const connectDB = async () => {
  try {
    console.log('MongoDB Connecting...')
    const conn = await mongoose.connect('mongodb+srv://<USER>:<PASS>@based.qkobt.mongodb.net/firstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Mongo DB Error: ${error.message}`)
    throw error
  }
}

// module.exports = connectDB
export default connectDB
