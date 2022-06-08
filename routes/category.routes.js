const { Router } = require('express');
const { validateToken }  = require('../middlewares/validate-token');
const { getAllCategories } = require('../controllers/category.controller');

const router = Router();

router.get('/category/get-all-categories', validateToken,  getAllCategories );

module.exports = router;