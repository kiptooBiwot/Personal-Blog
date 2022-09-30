const { userControllers } = require('../controllers/user.controllers')

const router = require('express').Router()

// Update
router.put('/:id', userControllers.updateUser)

// Delete
router.delete('/:id', userControllers.deleteUser)

// GET A SINGLE USER
router.get('/:id', userControllers.getUser)


module.exports = router