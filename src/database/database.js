
const { createPool } = require('mysql2/promise')
const config = require('../config')

const connect = async () => {
  const connection = await createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 10
  })

  return connection
}

module.exports = connect
