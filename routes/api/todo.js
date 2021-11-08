const express = require('express');
const todoRoutes = express.Router();
const auth = require('../../middleware/auth');

//? @GET
//? @Test route
//! @Private for user use auth require
todoRoutes.get('/', auth, (req, res, next) => {
  res.send('todo routes');
}); //! protected by auth middleware

module.exports = todoRoutes;
