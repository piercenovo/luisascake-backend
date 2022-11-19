import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { notFound, handleError } from './api/middlewares/index.js'

import authRouter from './api/routes/auth.routes.js'
import usersRouter from './api/routes/user.routes.js'
import productsRouter from './api/routes/products.routes.js'
import categoriesRouter from './api/routes/categories.routes.js'

// Initialization
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
const indexRouter = (req, res) => res.json({ message: "Bienvenido a la API de Luisa's Cake" })

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.get('/', indexRouter)
app.use('/api', authRouter)
app.use('/api', usersRouter)
app.use('/api', productsRouter)
app.use('/api', categoriesRouter)

// Handle errors
app.use(notFound) // in-case a url path is not found
app.use(handleError) // in-case an error has occured

// Static files
app.use(express.static(join(__dirname, 'uploads/profile')))
app.use(express.static(join(__dirname, 'uploads/home')))
app.use(express.static(join(__dirname, 'uploads/products')))
app.use(express.static(join(__dirname, 'uploads/categories')))

export default app
