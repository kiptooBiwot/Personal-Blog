const { categoryControllers } = require('../controllers/category.controllers')

const router = require('express').Router()


// Add categories
router.post('/', categoryControllers.createCategory)

// GEt all categories
router.get('/', categoryControllers.getAllCategories)


module.exports = router