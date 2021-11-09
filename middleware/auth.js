require('dotenv').config({ path: '../.env' });
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  //? error control flow
  if (!token) {
    let err = new Error({ message: 'unauthrorized access' });
    next(err);
  }

  //? if token exist
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw err;
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    next(error.message);
  }
};
