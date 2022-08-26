const { SemesterService } = require('./semester.service');
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
const createSemester = async (req, res, next) => {
  const { body } = req;
  try {
    const createdSemester = await SemesterService.createSemester(body);
    res.status(201).json({
      ok: true,
      message: 'Semested created',
      data: createdSemester,
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
const getSemesters = async (req, res, next) => {
  const { query } = req;
  try {
    const semesters = await SemesterService.getSemesters(query);
    res.json({
      ok: true,
      message: 'Semesters retrieved',
      data: semesters,
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
const getSemester = async (req, res, next) => {
  const id = req.params.id;
  try {
    const semester = await SemesterService.getSemester(id);
    res.json({
      ok: true,
      message: 'Semester retrieved',
      data: semester,
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

const updateSemester = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    const updatedSemester = await SemesterService.updateSemester(id, body);
    res.json({
      ok: true,
      message: 'Semester updated',
      data: updatedSemester,
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
const deleteSemester = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedSemester = await SemesterService.deleteSemester(id);
    res.json({
      ok: true,
      message: 'Semester deleted',
      data: deletedSemester,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  createSemester,
  getSemesters,
  getSemester,
  updateSemester,
  deleteSemester,
};
