require('dotenv').config();

const express = require('express');
const app = express();

// const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;

// body parser
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//router
app.use('/', require('./routes/index'));

app.listen(PORT, (req, res) => {
  // connectDB();
  console.log('listening on port ' + PORT);
});
