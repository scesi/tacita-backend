const Joi = require('joi');

const createActivitySchema = Joi.object().keys({
  title: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  content: Joi.string().required(),
  type: Joi.string().required(),
  score: Joi.number().required(),
  is_template: Joi.boolean().required(),
});

module.exports = {
  createActivitySchema,
};
