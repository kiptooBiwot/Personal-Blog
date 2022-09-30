const Category = require('../models/Category')
const createError = require('http-errors')

module.exports.categoryControllers = {
  createCategory: async (req, res, next) => {
    const newCategory = new Category(req.body)

    try {
      const savedCategory = await newCategory.save()

      res.json({ msg: 'Category saved', savedCategory })
    } catch (error) {
      return next(error)
    }
  },

  getAllCaetgories: async (req, res, next) => {
    try {
      const categories = await Category.find()
      if (categories.length == 0) throw createError(404, 'Not categories added yet')

      res.json(categories)
    } catch (error) {
      return next(error)
    }
  }
}