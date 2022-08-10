const express = require('express');
const app = express();

require('dotenv').config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handler

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// API
app.use('/api/v1/activities', require('./src/activities'));

// start server
app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running on port 3000');
});
