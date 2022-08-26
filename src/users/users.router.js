const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const { paramsSchema } = require('../common/schemas');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('./users.controller');
const {
  createUserSchema,
  updateUserSchema,
  querySchema,
} = require('./users.schema');

const router = Router();

router
  .post('/', [validationHandler(createUserSchema, 'body')], createUser)
  .get('/', [validationHandler(querySchema, 'query')], getAllUsers)
  .get('/:id', [validationHandler(paramsSchema, 'params')], getUserById)
  .patch(
    '/:id',
    [
      validationHandler(paramsSchema, 'params'),
      validationHandler(updateUserSchema, 'body'),
    ],
    updateUser,
  )
  .delete('/:id', [validationHandler(paramsSchema, 'params')], deleteUser);

module.exports = router;
