const Post = require('../models/Post')
const createError = require('http-errors')
const slugify = require('slugify')

module.exports.postControllers = {
  createArticle: async (req, res, next) => {
    // console.log('REQ.USER: ' + req.user)
    try {
      // console.log(req.body)
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
        slug: slug
      })
      console.log('Article To Be SAVED: ', newArticle)

      const savedArticle = await newArticle.save()

      res.json({ msg: savedArticle.published ? 'Your article has been published' : 'Your article has been saved to draft.', ...savedArticle._doc })
      // res.json({ msg: 'Your article has been published', data: req.body })
    } catch (error) {
      next(error)
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
      next(error)
    }
  },

  // Get all articles
  getArticles: async (req, res, next) => {
    const username = req.params.name
    const category = req.params.category

    // TODO: Handle search properly
    try {
      // TODO: Search using another parameter, username does not work
      if (username) {
        articles = await Post.find({ username })
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
        .populate('user', '-password')
        .populate('category', 'name')

      if (!article) throw createError(404, 'The article seems to have been deleted')

      res.json(article)
    } catch (error) {
      return next(error)
    }
  }
}