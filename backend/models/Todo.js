require('dotenv').config()

const url = process.env.MONGODB_URI

const mongoose = require('mongoose')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const todoSchema = new mongoose.Schema({
  item: String,
  date: Date
})

module.exports = mongoose.model('Todo', todoSchema)