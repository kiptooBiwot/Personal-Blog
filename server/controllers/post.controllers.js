const Post = require('../models/Post')
const createError = require('http-errors')

module.exports.postControllers = {
  createArticle: async (req, res, next) => {
    try {
      const newArticle = new Post({
        ...req.body
      })

      const savedArticle = await newArticle.save()

      res.json({ msg: 'Your article has been published', ...savedArticle._doc })
    } catch (error) {
      return next(error)
    }
  },

  updateArticle: async (req, res, next) => {
    try {
      const updatedArticle = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

      res.json({ msg: 'Article updated!', ...updatedArticle._doc })
    } catch (error) {
      return next()
    }
  },

  deleteArticle: async (req, res, next) => {
    try {
      await Post.findByIdAndDelete(req.params.id)

      res.json({ msg: 'Article deleted!' })
    } catch (error) {
      return next()
    }
  },

  // Get all articles
  getArticles: async (req, res, next) => {
    const username = req.params.name
    const category = req.params.category
    try {
      // TODO: Search using another parameter, username does not work
      if (username) {
        articles = await Post.find({ username })
      } else if (category) {
        articles = await Post.find({
          categories: {
            $in: [category]
          }
        })
      } else {
        articles = await Post.find()
      }

      if (articles.length == 0) throw createError(404, 'No articles published yet.')

      res.json(articles)
    } catch (error) {
      return next(error)
    }
  },

  // Get a single post
  getArticle: async (req, res, next) => {
    try {
      const article = await Post.findById(req.params.id)

      if (!article) throw createError(404, 'The article seems to have been deleted')

      res.json(article)
    } catch (error) {
      return next(error)
    }
  }
}