const createHttpError = require('http-errors');
const { prisma } = require('../common/db/client');

/**
 * @typedef {import('@prisma/client').Semester} Semester
 * @typedef {{date: Date}} Query
 */

const SemesterService = {
  /**
   * @param {Activity} newSemester
   * @returns
   */
  async createSemester(newSemester) {
    const semester = await prisma.semester.create({
      data: newSemester,
    });
    return semester;
  },
  /**
   * @param {Query} query
   * @returns
   */
  async getSemesters(query) {
    const where = {};
    Object.keys(query).forEach((key) => {
      if (key === 'date') {
        where.start_date = { gte: query[key] };
        where.end_date = { lte: query[key] };
      } else {
        where[key] = { equals: query[key] };
      }
    });
    const semesters = await prisma.semester.findMany({ where });
    return semesters;
  },
  /**
   *
   * @param {number} id
   * @returns
   */
  async getSemester(id) {
    const semester = await prisma.semester.findFirst({
      where: { id },
    });
    if (!semester) {
      throw createHttpError(404, 'Activity not found');
    }
    return semester;
  },
  /**
   *
   * @param {number} id
   * @param {Semester} newSemester
   * @returns
   */
  async updateSemester(id, newSemester) {
    let semester = await this.getSemester(id);
    semester = await prisma.semester.update({
      where: { id },
      data: newSemester,
    });
    return semester;
  },

  /**
   * @param {number} id
   * @returns
   */
  async deleteSemester(id) {
    let semester = await this.getSemester(id);
    semester = await prisma.semester.delete({
      where: { id },
    });
    return semester;
  },
};

module.exports = { SemesterService };
