import { Router } from 'express'
import { getAllCategories, addCategory, deleteCategory } from '../controllers/categories.controller.js'
import { uploadsCategory } from '../helpers/multer.js'

const router = Router()

router.get('/category/get-all-categories', getAllCategories)
router.post('/category/add-category', uploadsCategory.single('categoryImage'), addCategory)
router.post('/category/delete-category/:id', deleteCategory)

export default router
