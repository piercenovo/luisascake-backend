
const { createPool } = require('mysql2/promise')

const connect = async () => {
  const connection = await createPool({
    host: 'localhost',
    user: 'root',
    password: '#64AOO6@8FFBF8*',
    database: 'luisascakebd',
    connectionLimit: 10
  })

  return connection
}

module.exports = connect
