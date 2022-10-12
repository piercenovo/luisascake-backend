const { Router } = require('express')
const { getAllCategories, addCategory, deleteCategory } = require('../controllers/categories.controller')
const { uploadsCategory } = require('../helpers/multer')

const router = Router()

router.get('/category/get-all-categories', getAllCategories)
router.post('/category/add-category', uploadsCategory.single('categoryImage'), addCategory)
router.post('/category/delete-category/:id', deleteCategory)

module.exports = router
