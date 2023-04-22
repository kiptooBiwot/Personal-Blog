const Post = require('../models/Post')
const createError = require('http-errors')
const slugify = require('slugify')
const cloudinary = require('../utilities/cloudinary.utility')

module.exports.postControllers = {
  createArticle: async (req, res, next) => {
    // console.log('REQ.USER: ' + req.user)
    try {
      if (req.body === {}) throw createError[404]('Req.body is null!')

      let savedURI = null

      if (req.file) {
        const file = req.file
        const { path } = file

        const imageURI = await cloudinary.uploader.upload(path, {
          folder: "Personal Profile"
        })

        savedURI = imageURI.secure_url
      }

      console.log('SAVED URI for IMAGE: ', savedURI)

      const options = {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: false,
        locale: 'en',
        trim: true
      }
      const slug = slugify(req.body.title, options)

      const newArticle = new Post({
        ...req.body,
        user: req.user._id,
        photo: savedURI,
        slug: slug
      })
      console.log('Article To Be SAVED: ', newArticle)

      const savedArticle = await newArticle.save()

      res.json({ message: savedArticle.published ? 'Your article has been published' : 'Your article has been saved to draft.', ...savedArticle._doc })
      // res.json({ message: 'Your article has been published', data: req.body })
    } catch (error) {
      next(error)
    }
  },

  updateArticle: async (req, res, next) => {
    try {
      const updatedArticle = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

      res.json({ message: 'Article updated!', ...updatedArticle._doc })
    } catch (error) {
      return next()
    }
  },

  deleteArticle: async (req, res, next) => {
    try {
      console.log('Article to be deleted ', req.params.id)
      await Post.findByIdAndDelete(req.params.id)

      res.json({ message: 'Article deleted!' })
    } catch (error) {
      next(error)
    }
  },

  // Get a user's articles
  getUserArticles: async (req, res, next) => {
    const { id } = req.user
    console.log('ID FROM FRONTEND:', id)
    const category = req.params.category

    // TODO: Handle search properly
    try {
      // TODO: Search using another parameter, username does not work
      if (id) {
        articles = await Post.find({ id })
          .populate('user', '-password')
          .populate('category', 'name')
      } else if (category) {
        articles = await Post.find({
          category: {
            $in: [category]
          }
        }).populate('user', '-password')
      } else {
        articles = await Post.find().populate('user', '-password')
      }

      if (articles.length == 0) res.status(204).json({ message: 'No articles published yet.' })

      res.status(200).json(articles)
    } catch (error) {
      return next(error)
    }
  },

  // Get all articles for home display
  getArticles: async (req, res, next) => {
    try {
      const articles = await Post.find().populate('user', '-password').populate('category', 'name')

      if (articles.length == 0) res.status(204).json({ message: 'No articles published yet.' })

      res.status(200).json(articles)
    } catch (error) {
      next(error)
    }
  },

  // Get a single post
  getArticle: async (req, res, next) => {
    try {
      const article = await Post.findById(req.params.id)
        .populate('user', '-password')
        .populate('category', 'name')

      if (!article) throw createError(404, 'The article seems to have been deleted')

      res.json(article)
    } catch (error) {
      return next(error)
    }
  }
}