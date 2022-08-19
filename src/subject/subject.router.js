const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const {
  createSubjectSchema,
  getSubjectSchema,
  updateSubjectSchema,
} = require('./subject.schema');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Subject retrieved',
    data: [],
  });
});

router.get(
  '/:id',
  [validationHandler(getSubjectSchema, 'params')],
  (req, res) => {
    const { id } = req.params;

    const resp = { id };

    res.json({
      ok: true,
      message: 'Subject retrieved',
      data: resp,
    });
  },
);

router.post(
  '/',
  [validationHandler(createSubjectSchema, 'body')],
  (req, res) => {
    const { body } = req;

    res.json({
      ok: true,
      message: 'Subject created',
      data: body,
    });
  },
);

router.patch(
  '/:id',
  [
    validationHandler(getSubjectSchema, 'params'),
    validationHandler(updateSubjectSchema, 'body'),
  ],
  (req, res) => {
    const { id } = req.params;
    const body = req.body;

    res.json({
      ok: true,
      message: 'Subject updated',
      data: { id, ...body },
    });
  },
);

router.delete(
  '/:id',
  [validationHandler(getSubjectSchema, 'params')],
  (req, res) => {
    const { id } = req.params;
    res.json({
      ok: true,
      message: 'Subject deleted',
      data: { id },
    });
  },
);

module.exports = router;
