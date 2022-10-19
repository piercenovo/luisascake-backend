import { response, request } from 'express'
import { pool } from '../../config/database.config.js'

// GET NEWEST PRODUCTS
export const getNewestProducts = async (req = request, res = response) => {
  try {
    const conn = await pool()

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
export const getAllProducts = async (req = request, res = response) => {
  try {
    const conn = await pool()
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
      message: 'Something goes wrong'
    })
  }
}

// GET PRODUCTS FOR CATEGORY
export const getProductsForCategory = async (req = request, res = response) => {
  try {
    const conn = await pool()

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
      message: 'Something goes wrong'
    })
  }
}

// GET PRODUCT
export const getProduct = async (req = request, res = response) => {
  try {
    const conn = await pool()

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
      message: 'Something goes wrong'
    })
  }
}

// ADD PRODUCT
export const addProduct = async (req = request, res = response) => {
  try {
    const { name, description, stock, price, idCategory, cake, cake_value, padding, padding_value } = req.body
    const picture = req.file.filename
    const link = name.replaceAll(' ', '-').toLowerCase()
    const code = 'PRO' + (Math.random() + 1).toString(36).substring(8).toUpperCase()
    const discount = req.body.discount || 0
    const discount_value = req.body.discount_value || 0

    const conn = await pool()

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
