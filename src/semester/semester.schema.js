const Joi = require('joi');

const id = Joi.number().integer();

const gestion = Joi.string().required();
const end_date = Joi.date().required();
const start_date = Joi.date().required();

const getSemesterSchema = Joi.object({
  id: id.required(),
});

const createSemesterSchema = Joi.object({
  gestion: gestion.required(),
  end_date: end_date.required(),
  start_date: start_date.required(),
});

const updateSemesterSchema = Joi.object({
  gestion,
  start_date,
  end_date,
});

const querySchema = Joi.object().keys({
  date: Joi.date().optional(),
});

module.exports = {
  getSemesterSchema,
  createSemesterSchema,
  updateSemesterSchema,
  querySchema,
};
