const express = require('express');

const {
  boomErrorHandler,
  errorHandler,
} = require('./src/common/middlewares/error.handler');
const semesterRouter = require('./src/semester/semester.router');

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});
app.use('/api/semester', semesterRouter);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running on port 3000');
});
