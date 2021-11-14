const express = require('express');
const authRoutes = express.Router();
const { check, validationResult } = require('express-validator');
const signinController = require('../../controller/auth/signin');

//? @GET
//? @Test route
//! @Private for user use auth require
authRoutes.post(
  '/login',
  check('credentials', 'invalid email').isEmail(),
  check('password', 'user not found').isLength({ min: 6 }),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  },
  signinController //? change this middleware to user login middleware
);

module.exports = authRoutes;
