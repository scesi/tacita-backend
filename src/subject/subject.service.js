const createHttpError = require('http-errors');
const { prisma } = require('../common/db/client');

/**
 * @typedef {import('@prisma/client').Subject} Subject
 * @typedef {{date: Date}} Query
 */


 const SubjectService = {
    /**
     * @param {Activity} newSubject
     * @returns
     */
    async createSubject(newSubject) {
      const subject = await prisma.subject.create({
        data: newSubject,
      });
      return subject;
    },


    /**
     * @param {Query} query
     * @returns
     */

    async getSubjects(query) {
      const where = {};
      Object.keys(query).forEach((key) => {
        if (key === 'levels') {
          where.level = { equals: query[key] };
        }
      });
      const subject = await prisma.subject.findMany({ where });
      return subject;
    },

    /**
     *
     * @param {number} id
     * @returns
     */
    async getSubject(id) {
      const subject = await prisma.subject.findFirst({
        where: { id },
      });
      if (!subject) {
        throw createHttpError(404, 'Activity not found');
      }
      return subject;
    },


    /**
     *
     * @param {number} id
     * @param {Subject} newSubject
     * @returns
     */
    async updateSubject(id, newSubject) {
      let subject = await this.getSubject(id);
      subject = await prisma.subject.update({
        where: { id },
        data: newSubject,
      });
      return subject;
    },
  
    /**
     * @param {number} id
     * @returns
     */
    async deleteSubject(id) {
      let subject = await this.getSubject(id);
      subject = await prisma.subject.delete({
        where: { id },
      });
      return subject;
    },
  };
  
  module.exports = { SubjectService };