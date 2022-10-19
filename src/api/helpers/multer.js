import multer from 'multer'
import path from 'path'

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

export const uploadsProfile = multer({ storage })
export const uploadsProduct = multer({ storage: storageProduct })
export const uploadsCategory = multer({ storage: storageCategory })
