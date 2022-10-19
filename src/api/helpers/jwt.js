import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/general.config.js'

export const generarJsonWebToken = (uidPerson) => {
  return new Promise((resolve, reject) => {
    const payload = { uidPerson }

    jwt.sign(payload, JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (!err) { resolve(token) } else { reject('No se puedo generar el Token') }
    })
  })
}
