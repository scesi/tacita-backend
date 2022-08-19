const Joi = require('Joi');

const id = Joi.number().integer();

const title = Joi.string().required;
const level = Joi.integer().required;
const icon = Joi.string().required;

const getSubjectSchema = Joi.object({
  id : id.required(),
});

const createSubjectSchema = Joi.object({
  title: title.required(),
  level: level.required(),
  icon: icon.required(),
});

const updateSubjectSchema = Joi.object({
    title,
    level,
    icon,
});

module.exports = {
    getSubjectSchema,
    createSubjectSchema,
    updateSubjectSchema,
};