const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true })) // Use for form html.
app.use(express.json()) // Use for code js: XML HTTP request, fetch, axios, request

// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'));

//routes
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/news', (req, res) => {
  res.render('news')
})

app.get('/search', (req, res) => {
  console.log('req-get-search',req.query.q)
  res.render('search')
})

app.post('/search', (req, res) => {
  console.log('req-post-search',req.body)
  res.send('search')
})

// 127.0.0.1:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
