import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/general.config.js'

export const validateToken = (req, res, next) => {
  const token = req.header('xxx-token')

  if (!token) {
    return res.status(401).json({
      resp: false,
      message: 'There is not Token in the request'
    })
  }

  try {
    // -----------------------------------Add Jwt TOKEN key
    const { uidPerson } = jwt.verify(token, JWT_KEY)

    req.uidPerson = uidPerson

    next()
  } catch (e) {
    return res.status(401).json({
      resp: false,
      message: 'Invalid Token'
    })
  }
}
