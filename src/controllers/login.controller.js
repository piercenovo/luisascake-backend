
const { response, request } = require('express')
const connet = require('../database/database')
const bcrypt = require('bcrypt')
const { generarJsonWebToken } = require('../helpers/jwt')

const LoginUsuario = async (req = request, res = response) => {
  const { us_email, passwordd } = req.body

  try {
    const conn = await connet()

    const existsEmail = await conn.query('SELECT id, us_email, passwordd FROM users WHERE us_email = ? LIMIT 1', [us_email])

    if (existsEmail[0].length === 0) {
      conn.end()
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

const RenweToken = async (req = request, res = response) => {
  const token = await generarJsonWebToken(req.uidPerson)

  return res.json({
    resp: true,
    message: 'Luisas App',
    token
  })
}

module.exports = {
  LoginUsuario,
  RenweToken
}
