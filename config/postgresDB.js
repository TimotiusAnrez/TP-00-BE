const { Pool } = require('pg');

const credentials = {
  user: process.env.PG_USER,
  host: 'localhost',
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASWORD,
  port: 5432,
};

const pool = new Pool(credentials);

module.exports = pool;
