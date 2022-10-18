'use strict'

const assert = require('assert')
const dotenv = require('dotenv')

// read in the .env file
dotenv.config()

// capture the environment variables the application needs
const {
  PORT,
  HOST,
  HOST_URL,
  SQL_USER,
  SQL_PASSWORD,
  SQL_DATABASE,
  JWT_KEY
} = process.env

// validate the required configuration information
assert(PORT, 'PORT configuration is required.')
assert(HOST, 'HOST configuration is required.')
assert(HOST_URL, 'HOST_URL configuration is required.')
assert(SQL_USER, 'SQL_USER configuration is required.')
assert(SQL_PASSWORD, 'SQL_PASSWORD configuration is required.')
assert(SQL_DATABASE, 'SQL_DATABASE configuration is required.')
assert(JWT_KEY, 'JWT_KEY configuration is required.')

// export the configuration information
module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  sql: {
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
  },
  jwt: JWT_KEY
}
