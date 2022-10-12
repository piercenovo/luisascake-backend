const { validationResult } = require('express-validator')

const validateAuth = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      resp: false,
      errors: errors.mapped()
    })
  }

  next()
}

module.exports = {
  validateAuth
}
