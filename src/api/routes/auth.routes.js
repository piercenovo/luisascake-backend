import { Router } from 'express'
import { login, renewToken } from '../controllers/auth.controller.js'
import { validateToken } from '../middlewares/validate-token.js'

const router = Router()

router.post('/auth/login', login)
router.get('/auth/renew-login', validateToken, renewToken)

export default router
