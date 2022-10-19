import { Router } from 'express'

import {
  getAllProducts,
  addProduct,
  getNewestProducts,
  getProductsForCategory,
  getProduct
} from '../controllers/products.controller.js'

import { uploadsProduct } from '../helpers/multer.js'

const router = Router()

router.get('/product/get-newest-products', getNewestProducts)
router.get('/product/get-all-products', getAllProducts)
router.get('/product/get-products-for-category/:link', getProductsForCategory)
router.get('/product/get-product/:link', getProduct)
router.post('/product/add-product', uploadsProduct.single('productImage'), addProduct)

export default router
