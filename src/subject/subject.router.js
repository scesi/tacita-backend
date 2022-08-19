const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const{
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require('./subject.controller')
const {
  createSubjectSchema,
  getSubjectSchema,
  updateSubjectSchema,
  querySchema,
} = require('./subject.schema');

const router = Router();

router
  .get('/', [validationHandler(querySchema, 'query')], getSubjects)
  .get('/:id', [validationHandler(getSubjectSchema, 'params')], getSubject)
  .post('/', [validationHandler(createSubjectSchema, 'body')], createSubject)
  .patch(
    '/:id',
    [
      validationHandler(getSubjectSchema, 'params'),
      validationHandler(updateSubjectSchema, 'body'),
    ],
    updateSubject,
  )
  .delete(
    '/:id',
    [validationHandler(getSubjectSchema, 'params')],
    deleteSubject,
  );

module.exports = router;