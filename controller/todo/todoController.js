const pool = require('../../config/postgresDB');
const uuid = require('uuid');

class TodoController {
  static async getTodo(req, res, next) {
    const { user_id } = req.user;
    try {
      const data = await pool.query(
        'SELECT todo_id, description FROM todo WHERE user_id = $1',
        [user_id]
      );
      res.json(data.rows);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async createTodo(req, res, next) {
    const todoId = uuid.v4();
    const description = req.body.description;
    const { user_id } = req.user;
    const created_at = new Date();
    try {
      const newTodo = await pool.query(
        'INSERT INTO todo (todo_id, description, user_id, created_at) VALUES($1,$2,$3,$4) RETURNING *',
        [todoId, description, user_id, created_at]
      );
      res.json(newTodo.rows[0]);
    } catch (error) {
      res.send(error);
    }
  }

  static async updateTodo(req, res, next) {
    let { description, todo_id } = req.body;

    try {
      await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
        description,
        todo_id,
      ]);
      res.redirect('/todo');
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  static async deleteTodo(req, res, next) {
    let { todo_id } = req.body;
    try {
      await pool.query('DELETE FROM todo WHERE todo_id = $1', [todo_id]);
      res.redirect('/todo');
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
}

module.exports = TodoController;
