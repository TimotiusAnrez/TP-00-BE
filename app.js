require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const connectDB = require('./config/mongoDB');
const pool = require('./config/postgresDB');

const PORT = process.env.PORT || 8000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.use('/', require('./routes/index'));

app.listen(PORT, (req, res) => {
  connectDB();
  console.log('listening on port ' + PORT);
});
