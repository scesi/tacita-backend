const { Router } = require('express');
const validationHandler = require('../common/middlewares/validator.handler');
const {
  createSemesterSchema,
  getSemesterSchema,
  updateSemesterSchema,
} = require('./semester.schema');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Semesters retrieved',
    data: [],
  });
});

router.get(
  '/:id',
  [validationHandler(getSemesterSchema, 'params')],
  (req, res) => {
    const { id } = req.params;

    const resp = { id };

    res.json({
      ok: true,
      message: 'Semester retrieved',
      data: resp,
    });
  },
);

router.post(
  '/',
  [validationHandler(createSemesterSchema, 'body')],
  (req, res) => {
    const { body } = req;

    res.json({
      ok: true,
      message: 'Semester created',
      data: body,
    });
  },
);

router.patch(
  '/:id',
  [
    validationHandler(getSemesterSchema, 'params'),
    validationHandler(updateSemesterSchema, 'body'),
  ],
  (req, res) => {
    const { id } = req.params;
    const body = req.body;

    res.json({
      ok: true,
      message: 'Semester updated',
      data: { id, ...body },
    });
  },
);

router.delete(
  '/:id',
  [validationHandler(getSemesterSchema, 'params')],
  (req, res) => {
    const { id } = req.params;
    res.json({
      ok: true,
      message: 'Semester deleted',
      data: { id },
    });
  },
);

module.exports = router;
