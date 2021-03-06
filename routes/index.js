const express = require('express');
const routes = express.Router();
const userRoutes = require('./api/users');
const todoRoutes = require('./api/todo');
const authRoutes = require('./api/auth');
//? @ GET home
//? @ landing page
//? @ public access
routes.get('/', (req, res) => {
  res.send('home');
});

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

//! @ Private access
routes.use('/todo', todoRoutes);
module.exports = routes;
