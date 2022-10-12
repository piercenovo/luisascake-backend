const { Router } = require('express')
const { addNewUser, getUserById, changeFotoProfile, updateInformationUser, updateStreetAddress } = require('../controllers/user.controller')
const { uploadsProfile } = require('../helpers/multer')
const { validateToken } = require('../middlewares/validate-token')

const router = Router()

router.post('/user/add-new-user', addNewUser)
router.get('/user/get-user-by-id', validateToken, getUserById)
router.put('/user/update-picture-profile', [validateToken, uploadsProfile.single('image')], changeFotoProfile)
router.put('/user/update-information-user', validateToken, updateInformationUser)
router.put('/user/update-street-address', validateToken, updateStreetAddress)

module.exports = router
