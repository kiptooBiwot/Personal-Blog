module.exports.authControllers = {
  getUsers: async (req, res, next) => {
    res.json('User from Controller. It works!')
  }
}