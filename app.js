const express = require('express')
const path = require('path')

require('dotenv').config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./routes/user.routes'))
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/product.routes'))
app.use('/api', require('./routes/category.routes'))

// This folder will be Public
app.use(express.static(path.join(__dirname, 'uploads/profile')))
app.use(express.static(path.join(__dirname, 'uploads/home')))
app.use(express.static(path.join(__dirname, 'uploads/products')))
app.use(express.static(path.join(__dirname, 'uploads/categories')))

module.exports = app
