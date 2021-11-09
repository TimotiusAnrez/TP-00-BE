const express = require('express');
const authRoutes = express.Router();
const { check, validationResult } = require('express-validator');

//? @GET
//? @Test route
//! @Private for user use auth require
authRoutes.post(
  '/login',
  check('credential', 'user not found').isEmail(),
  check('passowrd', 'user not found').isLength({ min: 6 }, (req, res, next) => {
    res.send('login middleware');
  }) //? change this middleware to user login middleware
);

module.exports = authRoutes;
