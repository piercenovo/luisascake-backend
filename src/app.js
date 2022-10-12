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

// This folder will be Public
app.use(express.static(path.join(__dirname, 'uploads/profile')))
app.use(express.static(path.join(__dirname, 'uploads/home')))
app.use(express.static(path.join(__dirname, 'uploads/products')))
app.use(express.static(path.join(__dirname, 'uploads/categories')))

module.exports = app
