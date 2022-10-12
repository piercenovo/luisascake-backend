const { response, request } = require('express')
const connet = require('../database/database')

// GET NEWEST PRODUCTS
const getNewestProducts = async (req = request, res = response) => {
  try {
    const conn = await connet()

    const products = await conn.query('CALL SP_LIST_NEWEST_PRODUCTS();')

    await conn.end()

    return res.json({
      resp: true,
      message: 'Get Newest Products',
      newestProducts: products[0][0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// GET ALL PRODUCTS
const getAllProducts = async (req = request, res = response) => {
  try {
    const conn = await connet()
    const resultPerPage = 8
    const sql = 'SELECT * FROM product LIMIT '

    const products = await conn.query(sql + resultPerPage)

    await conn.end()

    return res.json({
      resp: true,
      message: 'Get All Products',
      products: products[0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// GET ALL PRODUCTS
// const getAllProducts = async (req = request, res = response) => {
//   try {
//     const conn = await connet()
//     const resultPerPage = 1
//     const sql = 'SELECT * FROM product LIMIT '
//     const numOfResults = res.length
//     const numOfPages = Math.ceil(numOfResults / resultPerPage)
//     const page = res.query.page ? Number(req.query.page) : 1

//     const products = await conn.query(sql + resultPerPage)

//     await conn.end()

//     return res.json({
//       resp: true,
//       message: 'Get All Products',
//       products: products[0]
//     })
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

// GET ALL PRODUCTS
// const getAllProducts = async (req = request, res = response) => {
//   try {
//     const conn = await connet()

//     const desde = Number(req.query.desde) || 0
//     const numOfResults = 1

//     const products = await conn.query('SELECT * FROM product').skip(desde).limit(numOfResults)
//     await conn.end()

//     return res.json({
//       resp: true,
//       message: 'Get All Products',
//       products: products[0]
//     })
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

// GET ALL PRODUCTS
// const getAllProducts = async (req = request, res = response) => {
//   try {
//     const conn = await connet()
//     const numOfResults = res.length
//     const numOfPages = Math.ceil(numOfResults / resultPerPage)
//     const page = res.query.page ? Number(req.query.page) : 1

//     const products = await conn.query('SELECT * FROM product')

//     if (page > numOfPages) {
//       await conn.end()

//       return res.redirect({
//         resp: true,
//         message: 'Get All Products',
//         products: '/?page=' + encodeURIComponent(numOfPages)
//       })
//     } else if (page < 1) {
//       res.redirect('/?page=' + encodeURIComponent('1'))
//     }
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

// GET PRODUCTS FOR CATEGORY
const getProductsForCategory = async (req = request, res = response) => {
  try {
    const conn = await connet()

    const products = await conn.query('CALL SP_LIST_PRODUCTS_FOR_CATEGORY(?);', [req.params.link])

    await conn.end()

    res.json({
      resp: true,
      message: 'Products For Category',
      products: products[0][0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// GET PRODUCT
const getProduct = async (req = request, res = response) => {
  try {
    const conn = await connet()

    const product = await conn.query('CALL SP_GET_PRODUCT(?);', [req.params.link])

    await conn.end()

    res.json({
      resp: true,
      message: 'Product',
      product: product[0][0][0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// ADD PRODUCT
const addProduct = async (req = request, res = response) => {
  try {
    const { name, description, stock, price, idCategory, cake, cake_value, padding, padding_value } = req.body
    const picture = req.file.filename
    const link = name.replaceAll(' ', '-').toLowerCase()
    const code = 'PRO' + (Math.random() + 1).toString(36).substring(8).toUpperCase()
    const discount = req.body.discount || 0
    const discount_value = req.body.discount_value || 0

    const conn = await connet()

    await conn.query('INSERT INTO product (name_product, link_product, description, stock, price, picture, code_product, discount, discount_value, cake, cake_value, padding, padding_value, category_id) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [name, link, description, stock, price, picture, code, discount, discount_value, cake, cake_value, padding, padding_value, idCategory])

    await conn.end()

    return res.json({
      resp: true,
      message: 'Product Added'
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// const getSearchForProduct = async (req = request, res = response) => {
//   try {
//     const conn = await connet()

//     const product = await conn.query('CALL SP_GET_SEARCH_FOR_PRODUCT(?);', [req.query])

//     conn.end()

//     return res.json({
//       resp: true,
//       message: 'Get Search for Product',
//       product: product[0][0]
//     })
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

// LIKE OR UNLIKE PRODUCT
// const likeOrUnlikeProduct = async (req = request, res = response) => {
//   try {
//     const { uidProduct } = req.body

//     const conn = await connet()

//     const isLike = await conn.query('SELECT COUNT(uidFavorite) isfavorite FROM favorite WHERE user_id = ? AND product_id = ?', [req.uidPerson, uidProduct])

//     if (isLike[0][0].isfavorite > 0) {
//       await conn.query('DELETE FROM favorite WHERE user_id = ? AND product_id = ?', [req.uidPerson, uidProduct])

//       await conn.end()

//       return res.json({
//         resp: true,
//         message: 'Unlike'
//       })
//     }

//     await conn.query('INSERT INTO favorite (user_id, product_id) VALUE (?,?)', [req.uidPerson, uidProduct])

//     await conn.end()

//     return res.json({
//       resp: true,
//       message: 'Like'
//     })
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

// const getProductsForCategories = async (req = request, res = response) => {
//   try {
//     const conn = await connet()

//     const products = await conn.query('CALL SP_LIST_PRODUCTS_FOR_CATEGORY(?,?);', [req.params.category, req.uidPerson])

//     await conn.end()

//     res.json({
//       resp: true,
//       message: 'List Products',
//       listProducts: products[0][0]
//     })
//   } catch (err) {
//     return res.status(500).json({
//       resp: false,
//       message: err
//     })
//   }
// }

module.exports = {
  getNewestProducts,
  getAllProducts,
  getProductsForCategory,
  getProduct,
  addProduct
  // getSearchForProduct
  // likeOrUnlikeProduct
  // productFavoriteForUser,
  // getProductsForCategories,
}
