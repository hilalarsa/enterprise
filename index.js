const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./config')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.get('/absen', db.showAllAbsen)
app.get('/absen/:id', db.insertAbsen)

app.get('/payrol/:id', db.createPayrollReport)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})