const { postControllers } = require('../controllers/post.controllers')

const router = require('express').Router()

// CREATE Post
router.post('/', postControllers.createArticle)

// UPDATE Post
router.put('/:id', postControllers.updateArticle)


// DELETE Post
router.delete('/:id', postControllers.deleteArticle)

// GET ALL articles
router.get('/', postControllers.getArticles)

// GET a single article
router.get('/:id', postControllers.getArticle)

module.exports = router