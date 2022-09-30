const { categoryControllers } = require('../controllers/category.controllers')

const router = require('express').Router()


// Add categories
router.post('/', categoryControllers)

// GEt all categories
router.get('/', categoryControllers)


module.exports = router