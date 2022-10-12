const { Router } = require('express')
const {
  getAllProducts,
  addProduct,
  getNewestProducts,
  getProductsForCategory,
  getProduct
  // getSearchForProduct
  // likeOrUnlikeProduct
} = require('../controllers/products.controller')
// const { validateToken } = require('../middlewares/validate-token')
const { uploadsProduct } = require('../helpers/multer')

const router = Router()

router.get('/product/get-newest-products', getNewestProducts)
router.get('/product/get-all-products', getAllProducts)
router.get('/product/get-products-for-category/:link', getProductsForCategory)
router.get('/product/get-product/:link', getProduct)
router.post('/product/add-product', uploadsProduct.single('productImage'), addProduct)
// router.get('/product/search/', getSearchForProduct)
// router.post('/product/like-or-unlike-product', validateToken, likeOrUnlikeProduct)
// router.get('/product/get-products-for-category/:idCategory', getProductsForCategories)

module.exports = router
