require('dotenv').config()
const express = require('express')
const router = require('./router')

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/', router)

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
