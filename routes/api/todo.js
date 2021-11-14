const express = require('express');
const todoRoutes = express.Router();
const auth = require('../../middleware/auth');
const TodoController = require('../../controller/todo/todoController');
const pool = require('../../config/postgresDB');
//? @GET
//? @Test route
//! @Private for user use auth require
todoRoutes.use(auth);
todoRoutes.get('/', TodoController.getTodo); //! protected by auth middleware
todoRoutes.post('/', TodoController.createTodo);
todoRoutes.put('/', TodoController.updateTodo);
todoRoutes.delete('/', TodoController.deleteTodo);

module.exports = todoRoutes;
