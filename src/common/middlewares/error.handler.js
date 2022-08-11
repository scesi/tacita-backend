function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    payload: req.body || req.query || req.params,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
  next();
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

module.exports = {
  errorHandler,
  boomErrorHandler,
};
