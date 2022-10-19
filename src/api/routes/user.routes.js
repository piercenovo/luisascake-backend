import { Router } from 'express'

import {
  addNewUser,
  getUserById,
  changeFotoProfile,
  updateInformationUser,
  updateStreetAddress
} from '../controllers/user.controller.js'

import { uploadsProfile } from '../helpers/multer.js'
import { validateToken } from '../middlewares/validate-token.js'

const router = Router()

router.post('/user/add-new-user', addNewUser)
router.get('/user/get-user-by-id', validateToken, getUserById)
router.put('/user/update-picture-profile', [validateToken, uploadsProfile.single('image')], changeFotoProfile)
router.put('/user/update-information-user', validateToken, updateInformationUser)
router.put('/user/update-street-address', validateToken, updateStreetAddress)

export default router
