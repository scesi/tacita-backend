const Joi = require('joi');

const createActivitySchema = Joi.object().keys({
  title: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  content: Joi.string().required(),
  type: Joi.string().required(),
  score: Joi.number().optional(),
  is_template: Joi.boolean().optional(),
  status_id: Joi.number().integer().required(),
});

const updateActivitySchema = Joi.object().keys({
  title: Joi.string().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  content: Joi.string().optional(),
  type: Joi.string().optional(),
  score: Joi.number().optional(),
  is_template: Joi.boolean().optional(),
  status_id: Joi.number().integer().optional(),
});

const querySchema = Joi.object().keys({
  date: Joi.date().optional(),
});

module.exports = {
  createActivitySchema,
  updateActivitySchema,
  querySchema,
};
