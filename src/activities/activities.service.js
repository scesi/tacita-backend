const createHttpError = require('http-errors');
const { prisma } = require('../common/db/client');

/**
 * @typedef {import('@prisma/client').Activity} Activity
 * @typedef {{date: Date}} Query
 */

const StatusService = {
  async getStatus(id) {
    const status = await prisma.status.findFirst({
      where: { id },
    });
    if (!status) {
      throw createHttpError(404, 'Status not found');
    }
    return status;
  },
};

const ActivitiesService = {
  /**
   * @param {Activity} newActivity
   * @returns
   */
  async createActivity(newActivity) {
    const status = await StatusService.getStatus(newActivity.status_id);
    newActivity.status_id = status.id;
    const activity = await prisma.activity.create({
      data: newActivity,
    });
    return activity;
  },

  /**
   * @param {Query} query
   * @returns
   */
  async getActivities(query) {
    const where = {};
    Object.keys(query).forEach((key) => {
      if (key === 'date') {
        where.start_date = { gte: query[key] };
        where.end_date = { lte: query[key] };
      } else {
        where[key] = { equals: query[key] };
      }
    });
    const activities = await prisma.activity.findMany({ where });
    return activities;
  },
  /**
   *
   * @param {number} id
   * @returns
   */
  async getActivity(id) {
    const activity = await prisma.activity.findFirst({
      where: { id },
    });
    if (!activity) {
      throw createHttpError(404, 'Activity not found');
    }
    return activity;
  },
  /**
   *
   * @param {number} id
   * @param {Partial<Activity>} newActivity
   * @returns
   */
  async updateActivity(id, newActivity) {
    const status = newActivity.status_id
      ? await StatusService.getStatus(newActivity.status_id)
      : { id: newActivity.status_id };
    let activity = await this.getActivity(id);
    newActivity.status_id = status.id;
    activity = await prisma.activity.update({
      where: { id },
      data: newActivity,
    });
    return activity;
  },

  /**
   * @param {number} id
   * @returns
   */
  async deleteActivity(id) {
    let activity = await this.getActivity(id);
    activity = await prisma.activity.delete({
      where: { id },
    });
    return activity;
  },
};

module.exports = { ActivitiesService };
