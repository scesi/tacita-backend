const { Router } = require('express');
const {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
} = require('./activities.controller');

const router = Router();

router
  .post('/', createActivity)
  .get('/', getActivities)
  .get('/:id', getActivity)
  .put('/:id', updateActivity)
  .delete('/:id', deleteActivity);

module.exports = router;
