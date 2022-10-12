const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'src/uploads/profile')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const storageProduct = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'src/uploads/products')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const storageCategory = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'src/uploads/categories')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const uploadsProfile = multer({ storage })
const uploadsProduct = multer({ storage: storageProduct })
const uploadsCategory = multer({ storage: storageCategory })

module.exports = {
  uploadsProfile,
  uploadsProduct,
  uploadsCategory
}
