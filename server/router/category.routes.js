const { categoryControllers } = require('../controllers/category.controllers')
const { protect } = require('../utilities/auth.middleware')

const router = require('express').Router()


// Add categories
router.post('/', protect, categoryControllers.createCategory)

// GEt all categories
router.get('/', categoryControllers.getAllCategories)


module.exports = router