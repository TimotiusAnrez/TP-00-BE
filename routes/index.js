const express = require('express');
const routes = express.Router();

//? @ GET home
//? @ landing page
//? @ public
routes.get('/', (req, res) => {
  res.send('home');
});

module.exports = routes;
