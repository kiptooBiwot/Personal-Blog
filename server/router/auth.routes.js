const { authControllers } = require('../controllers/auth.controllers')

const router = require('express').Router()

// REGISTER
router.post('/register', authControllers.registerUser)

// LOGIN
router.post('/login', authControllers.loginUser)

module.exports = router