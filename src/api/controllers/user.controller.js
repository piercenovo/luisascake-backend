
import { request, response } from 'express'
import fs from 'fs-extra'
import path from 'path'
import bcrypt from 'bcrypt'
import { pool } from '../../config/database.config.js'

export const addNewUser = async (req = request, res = response) => {
  const { username, email, passwordd } = req.body

  const salt = bcrypt.genSaltSync()
  const pass = bcrypt.hashSync(passwordd, salt)

  const hasEmail = await pool.query('SELECT us_email FROM users WHERE us_email = ?', [email])

  if (hasEmail[0].length === 0) {
    await pool.query('CALL SP_REGISTER_USER(?,?,?);', [username, email, pass])

    pool.end()

    return res.json({
      resp: true,
      message: 'Usuario ' + username + ' fue creado con exito!'
    })
  } else {
    return res.json({
      resp: false,
      message: 'Email already exists'
    })
  }
}

export const getUserById = async (req = request, res = response) => {
  try {
    console.log(req.uidPerson)
    const userdb = await pool.query('CALL SP_GET_USER_BY_ID(?);', [req.uidPerson])

    pool.end()

    return res.json({
      resp: true,
      message: 'Get user by Id',
      user: userdb[0][0][0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

export const changeFotoProfile = async (req = request, res = response) => {
  try {
    const rows = await pool.query('SELECT image FROM person WHERE pe_id = ?', [req.uidPerson])

    if (rows[0][0].image != null) {
      await fs.unlink(path.resolve('src/uploads/profile/' + rows[0][0].image))
    }

    await pool.query('UPDATE person SET image = ? WHERE pe_id = ?', [req.file.filename, req.uidPerson])

    await pool.end()

    return res.json({
      resp: true,
      message: 'Updated image'
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

export const updateInformationUser = async (req = request, res = response) => {
  try {
    const { pe_firstname, lastname, phone, address, reference } = req.body

    await pool.query('CALL SP_UPDATE_INFORMATION(?,?,?,?,?,?);', [req.uidPerson, pe_firstname, lastname, phone, address, reference])

    await pool.end()

    return res.json({
      resp: true,
      message: 'Infomation personal added'
    })
  } catch (err) {
    return res.json({
      resp: false,
      message: err
    })
  }
}

export const updateStreetAddress = async (req, res = response) => {
  try {
    const { address, reference } = req.body

    await pool.query('CALL SP_UPDATE_STREET(?,?,?);', [req.uidPerson, address, reference])

    await pool.end()

    return res.json({
      resp: true,
      message: 'Street Address updated'
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}
