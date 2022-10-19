import { response, request } from 'express'
import { pool } from '../../config/database.config.js'

// GET ALL CATEGORIES
export const getAllCategories = async (req = request, res = response) => {
  try {
    const conn = await pool()

    const categories = await conn.query('SELECT * FROM category')

    await conn.end()

    return res.json({
      resp: true,
      message: 'Get all categories',
      categories: categories[0]
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// ADD CATEGORY
export const addCategory = async (req = request, res = response) => {
  try {
    const { name } = req.body
    const link = name.replaceAll(' ', '-').toLowerCase()
    const picture = req.file.filename
    const code = 'CAT' + (Math.random() + 1).toString(36).substring(8).toUpperCase()

    const conn = await pool()

    await conn.query('INSERT INTO category (name_category, link_category, picture, code_category) VALUE (?,?,?,?)',
      [name, link, picture, code])

    await conn.end()

    return res.json({
      resp: true,
      message: 'Category Added'
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}

// DELETE CATEGORY
export const deleteCategory = async (req = request, res = response) => {
  try {
    // const { id } = req.body

    const conn = await pool()

    await conn.query('DELETE FROM category WHERE id_category = ?',
      [req.params.id])

    await conn.end()

    return res.json({
      resp: true,
      message: 'Category Deleted'
    })
  } catch (err) {
    return res.status(500).json({
      resp: false,
      message: err
    })
  }
}
