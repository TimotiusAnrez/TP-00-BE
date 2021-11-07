require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

// body parser
app.use(express.json({ extended: false }));

//router
app.use('/', require('./routes/index'));

app.listen(PORT, (req, res) => {
  console.log('listening on port ' + PORT);
});
