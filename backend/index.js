const express = require('express')
const app = express()
const cors = require('cors')
const Todo = require('./models/Todo')

require('dotenv').config()

app.use(express.json())
app.use(cors())

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get('/api/todos', (req, res) => {
  Todo.find({}).then(todos => {
    res.json(todos)
  })
})

app.delete('/api/todos/:id', (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/todos/:id', (req, res, next) => {
  const todo = {
    item: req.body.item
  }

  Todo.findByIdAndUpdate(req.params.id, todo, {new: true})
    .then(updatedTodo => {
      res.json(updatedTodo)
    })
    .catch(error => next(error))
})

app.post('/api/todos', (req, res) => {
  let body = req.body;

  if (!body.item) {
    return res.status(400).json({
      error: 'item missing'
    })
  }

  const todo = new Todo({
    item: body.item,
    date: new Date()
  })

  todo.save().then(response => {
    res.json(todo)
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})