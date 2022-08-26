const { UsersService } = require('./users.services');

const createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const user = await UsersService.createUser(body);
    res.status(201).json({
      ok: true,
      message: 'User created',
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const { query } = req;
  try {
    const users = await UsersService.getAllUsers(query);
    res.json({
      ok: true,
      message: 'Users retrieved',
      data: users,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UsersService.getUserById(id);
    res.json({
      ok: true,
      message: 'User retrieved',
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UsersService.deleteUser(id);
    res.status(200).json({
      ok: true,
      message: 'User deleted',
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    const user = await UsersService.updateActivity(id, body);
    res.json({
      ok: true,
      message: 'user updated',
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUserById,
};
