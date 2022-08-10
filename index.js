const express = require('express');

const {
  boomErrorHandler,
  errorHandler,
} = require('./src/common/middlewares/error.handler');

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
app.use('/api/semester', require('./src/semester/semester.router'));
app.use('/api/activities', require('./src/activities/activities.router'));

app.use(boomErrorHandler);
app.use(errorHandler);

// API

// start server
app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running on port 3000');
});
