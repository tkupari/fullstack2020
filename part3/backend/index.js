const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(cors())

morganFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}

app.use(morgan(morganFormat))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]


app.get('/api/persons', (_req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  if(!person.name || !person.number) {
    return res.status(400).json({
      error: 'name or number information missing'
    })
  }
  if(persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  person.id = Math.floor(Math.random() * 1000000000)
  persons = persons.concat(person)
  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.get('/info', (_req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p>${new Date()}</p></p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
