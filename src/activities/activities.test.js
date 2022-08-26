const { prismaMock } = require('../common/db/singleton');
const { ActivitiesService } = require('./activities.service');

/**
 * @typedef {import('@prisma/client').Activity} Activity
 */

describe('activities service', () => {
  /** @type {Partial<Activity>} */
  let activityData;
  beforeEach(() => {
    const date = new Date();
    activityData = {
      title: 'Test activity',
      start_date: new Date(date),
      end_date: new Date(date.setDate(date.getDate() + 7)),
      status_id: 1,
      content: 'Test content',
      type: 'Test type',
      score: 51,
      is_template: false,
    };
    prismaMock.activity.create.mockImplementation(({ data }) => {
      return { id: 1, ...data };
    });
    prismaMock.activity.findFirst.mockImplementation(({ where }) => {
      if (where.id != 1) return undefined;
      return { id: 1, ...activityData };
    });
    prismaMock.activity.findMany.mockImplementation(({ where }) => {
      const activity = { id: 1, ...activityData };
      const keys = Object.keys(where);
      const invalidData = keys.length
        ? keys.every((key) => !activity[key])
        : false;
      if (invalidData) throw new Error('some error');
      return [activity];
    });
    prismaMock.activity.update.mockImplementation(({ where, data }) => {
      const activity = { id: where.id, ...activityData, ...data };
      return activity;
    });
    prismaMock.status.findFirst.mockImplementation(({ where }) => {
      if (where.id != 1) return undefined;
      return { id: 1, name: 'Active', color: '#00ff00' };
    });
  });

  describe('when create a activity', () => {
    /** @type {Activity} */
    let activity;
    it('should return created activity', async () => {
      activity = await ActivitiesService.createActivity(activityData);
      expect(activity).toBeDefined();
    });
    it('and activity should match data', () => {
      expect(activity).toMatchObject({
        ...activityData,
        id: 1,
        start_date: expect.any(Date),
        end_date: expect.any(Date),
      });
    });
    describe('and status not found', () => {
      const data = { ...activityData, status_id: 6 };
      it('should throw a Error', async () => {
        expect(ActivitiesService.createActivity(data)).rejects.toThrow(
          'Status not found',
        );
      });
    });
  });

  describe('when getting an Activity', () => {
    let activity;
    it('should return an activity', async () => {
      activity = await ActivitiesService.getActivity(1);
      expect(activity).toBeDefined();
    });
    it('and activity should match data', () => {
      expect(activity).toMatchObject({
        ...activityData,
        id: 1,
        start_date: expect.any(Date),
        end_date: expect.any(Date),
      });
    });
    describe('and the activity not found', () => {
      it('should throw a Not found error', async () => {
        expect(ActivitiesService.getActivity(23)).rejects.toThrow(
          'Activity not found',
        );
      });
    });
  });

  describe('when getting many Activities', () => {
    it('should return a list of activities', async () => {
      const activities = await ActivitiesService.getActivities({});
      expect(activities).toBeDefined();
      expect(activities).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...activityData,
            id: 1,
            start_date: expect.any(Date),
            end_date: expect.any(Date),
          }),
        ]),
      );
    });

    describe('query params was provided and fail', () => {
      it('should throw some error', () => {
        const query = { name: 'Name' }; // name is not a activity property
        expect(ActivitiesService.getActivities(query)).rejects.toThrow(
          expect.any(Error),
        );
      });
    });
  });

  describe('when updatting Activity', () => {
    /**@type {Partial<Activity>} */
    const newData = {
      title: 'Updated Title',
      content: 'Updated content ...',
    };
    it('should return updated activity', async () => {
      const activity = await ActivitiesService.updateActivity(1, newData);
      expect(activity).toBeDefined();
      expect(activity.title).toBe(newData.title);
      expect(activity.content).toBe(newData.content);
    });
    describe('and activitiy is not found', () => {
      it('should throw Activity not found', () => {
        expect(ActivitiesService.updateActivity(32, newData)).rejects.toThrow(
          'Activity not found',
        );
      });
    });
  });

  describe('when deleting Activity', () => {
    it('should call prisma delete method', async () => {
      await ActivitiesService.deleteActivity(1);
      expect(prismaMock.activity.delete).toBeCalled();
    });
    describe('and activitiy is not found', () => {
      it('should throw Activity not found', () => {
        expect(ActivitiesService.deleteActivity(12)).rejects.toThrow(
          'Activity not found',
        );
      });
    });
  });
});
