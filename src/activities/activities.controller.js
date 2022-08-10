const { createActivitySchema } = require('./activities.schema');
const createError = require('http-errors');

/**
 * @param {Request} req
 * @param {Response} res
 */
const createActivity = async (req, res) => {
  const data = createActivitySchema.validate(req.body);
  if (data.error) {
    throw createError(422, data.error.details[0].message);
  }
  res.json(data.value);
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getActivities = async (req, res) => {
  const query = req.query;
  const activities = {
    count: 10,
    items: [],
  };
  res.json({
    query,
    items: activities,
  });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const getActivity = async (req, res) => {
  const id = req.params.id;
  res.json({
    id,
    item: {},
  });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const updateActivity = async (req, res) => {
  const id = req.params.id;
  const data = createActivitySchema.validate(req.body);
  if (data.error) {
    throw createError(422, data.error.details[0].message);
  }
  res.json({
    id,
    data: data.value,
  });
};

/**
 * @param {Request} req
 * @param {Response} res
 */
const deleteActivity = async (req, res) => {
  const id = req.params.id;
  res.json({ id });
};

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
