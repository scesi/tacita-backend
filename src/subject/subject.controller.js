const { SubjectService } = require('.//subject.service');
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
const createSubject = async (req, res, next) => {
  const { body } = req;
  try {
    const createdSubject = await SubjectService.createSubject(body);
    res.status(201).json({
      ok: true,
      message: 'Subject created',
      data: createdSubject,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getSubjects = async (req, res, next) => {
  const { query } = req;
  try {
    const subjects = await SubjectService.getSubjects(query);
    res.json({
      ok: true,
      message: 'Subjects retrieved',
      data: subjects,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getSubject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const subject = await SubjectService.getSubject(id);
    res.json({
      ok: true,
      message: 'Subject retrieved',
      data: subject,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const updateSubject = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    const updatedSubject = await SubjectService.updateSubject(id, body);
    res.json({
      ok: true,
      message: 'Subject updated',
      data: updatedSubject,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteSubject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedSubject = await SubjectService.deleteSubject(id);
    res.json({
      ok: true,
      message: 'Subject deleted',
      data: deletedSubject,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};
