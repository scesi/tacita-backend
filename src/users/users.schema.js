const Joi = require('joi');

const createUserSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  hased_password: Joi.string().required(),
  email: Joi.string().required(),
});

const updateUserSchema = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  username: Joi.string().required(),
  hased_password: Joi.string().required(),
  email: Joi.string().required(),
});

const querySchema = Joi.object().keys({
  date: Joi.date().optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  querySchema,
};
