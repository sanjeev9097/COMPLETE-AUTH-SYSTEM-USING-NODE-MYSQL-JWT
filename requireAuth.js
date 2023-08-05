const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt; // Assuming you're storing the JWT in a cookie named 'jwt'

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // Invalid token, redirect to login page
        res.redirect('/login');
      } else {
        // Valid token, user is logged in, proceed to the next middleware or route
        res.locals.isLoggedIn = true;
        next();
      }
    });
  } else {
    // No token found, redirect to login page
    res.redirect('/login');
  }
};

module.exports = requireAuth;