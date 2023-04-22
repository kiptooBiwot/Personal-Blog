const { postControllers } = require('../controllers/post.controllers')
const { protect } = require('../utilities/auth.middleware')
const upload = require('../utilities/multer.utility')

const router = require('express').Router()

// CREATE Post
router.post('/', upload.single('photo'), protect, postControllers.createArticle)

// UPDATE Post
router.put('/:id', postControllers.updateArticle)


// DELETE Post
router.delete('/:id', postControllers.deleteArticle)

// GET User's articles
router.get('/', protect, postControllers.getUserArticles)

// GET All articles
router.get('/all', postControllers.getArticles)

// GET a single article
router.get('/:id', postControllers.getArticle)

module.exports = router