const boom = require('@hapi/boom');

/**
 * @param {import('joi').Schema} schema
 * @param {"body"| "params" | "query"} property
 * @returns
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { value, error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    }
    req[property] = value;
    next();
  };
}

module.exports = validatorHandler;
