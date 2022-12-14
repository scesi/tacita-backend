const { ActivitiesService } = require('./activities.service');

/**
 * @typedef {import('express').Request}  Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createActivity = async (req, res, next) => {
  const { body } = req;
  try {
    const activity = await ActivitiesService.createActivity(body);
    res.status(201).json({
      ok: true,
      message: 'Activity created',
      data: activity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getActivities = async (req, res, next) => {
  const { query } = req;
  try {
    const activities = await ActivitiesService.getActivities(query);
    res.json({
      ok: true,
      message: 'Activities retrieved',
      data: activities,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getActivity = async (req, res, next) => {
  const id = req.params.id;
  try {
    const activity = await ActivitiesService.getActivity(id);
    res.json({
      ok: true,
      message: 'Activity retrieved',
      data: activity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateActivity = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    const activity = await ActivitiesService.updateActivity(id, body);
    res.json({
      ok: true,
      message: 'Activity updated',
      data: activity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteActivity = async (req, res, next) => {
  const id = req.params.id;
  try {
    const activity = await ActivitiesService.deleteActivity(id);
    res.status(200).json({
      ok: true,
      message: 'Activity deleted',
      data: activity,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
