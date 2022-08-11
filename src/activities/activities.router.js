const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const { paramsSchema } = require('../common/schemas');
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} = require('./activities.controller');
const {
  createActivitySchema,
  updateActivitySchema,
  querySchema,
} = require('./activities.schema');

const router = Router();

router
  .post('/', [validationHandler(createActivitySchema, 'body')], createActivity)
  .get('/', [validationHandler(querySchema, 'query')], getActivities)
  .get('/:id', [validationHandler(paramsSchema, 'params')], getActivity)
  .patch(
    '/:id',
    [
      validationHandler(paramsSchema, 'params'),
      validationHandler(updateActivitySchema, 'body'),
    ],
    updateActivity,
  )
  .delete('/:id', [validationHandler(paramsSchema, 'params')], deleteActivity);

module.exports = router;
