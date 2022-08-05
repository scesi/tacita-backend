const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server is running on port 3000');
});
