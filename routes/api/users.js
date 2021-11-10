const express = require('express');
const userRoutes = express.Router();
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');
const createUser = require('../../controller/users/createUser');

//? @GET
//? @ADMIN get all user data to dashboard
//! private for admin
userRoutes.get('/', adminAuth, (req, res, next) => {
  res.send('get all user routes');
});

//? @POST
//? @Signup routes
//? @Public
userRoutes.post(
  '/',
  check('username', 'username must not empty').not().isEmpty(),
  check('password', 'must be 6 character at least')
    .trim(' ')
    .isLength({ min: 6 }),
  check('email', 'email is invalid').isEmail().withMessage(),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
  createUser
  //? user registration async function using mongoose returned signed jwt please put in user registration middleware here to call after body sanitized
);

module.exports = userRoutes;
