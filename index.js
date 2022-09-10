const express = require('express');
const helmet = require('helmet');
const cron = require('node-cron');

const {
  boomErrorHandler,
  errorHandler,
} = require('./src/common/middlewares/error.handler');

const app = express();

require('dotenv').config({
  path: '.env',
});

// middlewares
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// API
app.use('/api/semester', require('./src/semester/semester.router'));
app.use('/api/activities', require('./src/activities/activities.router'));
app.use('/api/users', require('./src/users/users.router'));

// error handler
app.use(boomErrorHandler);
app.use(errorHandler);

// Scheduled Jobs every monday at 00:00
cron.schedule('0 0 * * 1', () => {
  // TODO: delete user schedule in DB
});

// start server
app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running on port 3000');
});
