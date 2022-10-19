
import { createPool } from 'mysql2/promise'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER
} from './general.config.js'

export const pool = async () => {
  const connection = await createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
  })

  return connection
}
