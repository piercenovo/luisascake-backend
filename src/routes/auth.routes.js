const { Router } = require('express')
const { LoginUsuario, RenweToken } = require('../controllers/login.controller')
const { validateToken } = require('../middlewares/validate-token')

const router = Router()

router.post('/auth/login', LoginUsuario)
router.get('/auth/renew-login', validateToken, RenweToken)

module.exports = router
