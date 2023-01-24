const { expressjwt: jwt } = require('express-jwt')

const authJwt = () => {
  // console.log('WE ARE GETTING HERE! AUTH MIDDLEWARE');
  return jwt(
    {
      secret: process.env.SECRET_KEY,
      algorithms: ['HS256'],
      isRevoked: isRevoked
    }
  ).unless({
    path: [
      // Use a regular expression to all all routes under products to be viewed without auth token
      { url: /\/api\/v1\/article(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/category(.*)/, methods: ['GET', 'OPTIONS'] },
      '/api/v1/auth/login',
      '/api/v1/auth/register',
    ]
  })
}

// CHECK for USER roles
async function isRevoked(req, token) {
  // Reject request if user is not admin
  // console.log('PAYLOAD: ' + token.payload.isAdmin);
  if (token.payload.isAdmin === false) {
    console.log('Not administrator')
    return true
  }
  // Add more roles as per the app design
  // If user is admin, proceed
  console.log('User is Administrator');
  return false
}

module.exports = authJwt