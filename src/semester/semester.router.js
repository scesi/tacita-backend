const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
} = require('./semester.controller');

const {
  createSemesterSchema,
  getSemesterSchema,
  updateSemesterSchema,
  querySchema,
} = require('./semester.schema');

const router = Router();

router
  .get('/', [validationHandler(querySchema, 'query')], getSemesters)
  .get('/:id', [validationHandler(getSemesterSchema, 'params')], getSemester)
  .post('/', [validationHandler(createSemesterSchema, 'body')], createSemester)
  .patch(
    '/:id',
    [
      validationHandler(getSemesterSchema, 'params'),
      validationHandler(updateSemesterSchema, 'body'),
    ],
    updateSemester,
  )
  .delete(
    '/:id',
    [validationHandler(getSemesterSchema, 'params')],
    deleteSemester,
  );

module.exports = router;
