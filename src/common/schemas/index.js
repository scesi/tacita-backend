const Joi = require('joi');

const id = Joi.number().integer();
const paramsSchema = Joi.object().keys({
  id: id,
});

module.exports = { paramsSchema };
