
import { response, request } from 'express'
import { pool } from '../../config/database.config.js'
import bcrypt from 'bcrypt'
import { generarJsonWebToken } from '../helpers/jwt.js'

export const login = async (req = request, res = response) => {
  const { us_email, passwordd } = req.body

  try {
    const conn = await pool()

    const existsEmail = await pool.query('SELECT id, us_email, passwordd FROM users WHERE us_email = ? LIMIT 1', [us_email])

    if (existsEmail[0].length === 0) {
      pool.end()
      return res.status(400).json({
        resp: false,
        message: 'Wrong Credentials'
      })
    }

    const validatedPassword = await bcrypt.compareSync(passwordd, existsEmail[0][0].passwordd)

    if (!validatedPassword) {
      conn.end()
      return res.status(400).json({
        resp: false,
        message: 'Wrong Credentials'
      })
    }

    const token = await generarJsonWebToken(existsEmail[0][0].id)

    conn.end()
    return res.json({
      resp: true,
      message: 'Luisas App',
      token
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

export const renewToken = async (req = request, res = response) => {
  const token = await generarJsonWebToken(req.uidPerson)

  return res.json({
    resp: true,
    message: 'Luisas App',
    token
  })
}
