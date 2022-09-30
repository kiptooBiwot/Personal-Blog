const { authControllers } = require('../controllers/auth.controllers')

const router = require('express').Router()

router.get('/', authControllers.getUsers)

module.exports = router