const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

require('dotenv').config()

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/api', require('./routes/user.routes'))
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/products.routes'))
app.use('/api', require('./routes/categories.routes'))

// Public Directory
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/uploads/profile')))
app.use(express.static(path.join(__dirname, 'public/uploads/home')))
app.use(express.static(path.join(__dirname, 'public/uploads/products')))
app.use(express.static(path.join(__dirname, 'public/uploads/categories')))

module.exports = app
