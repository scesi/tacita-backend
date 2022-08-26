const createHttpError = require('http-errors');
const { prisma } = require('../common/db/client');

const UsersService = {
  async createUser(newUser) {
    const userCreated = await prisma.user.create({
      data: newUser,
    });
    return userCreated;
  },
  async getUserById(id) {
    const userFound = await prisma.user.findFirst({
      where: { id },
    });
    if (!userFound) {
      throw createHttpError(404, 'User not found');
    }
    return userFound;
  },
  async getAllUsers() {
    const usersFound = await prisma.user.findMany();
    if (!usersFound) {
      throw createHttpError(404, 'No users found');
    }
    return usersFound;
  },
  async deleteUser(id) {
    const userDeleted = await prisma.user.delete({
      where: { id },
    });
    if (!userDeleted) {
      throw createHttpError(404, 'User not found');
    }
    return userDeleted;
  },
  async updateUser(id, newUser) {
    let user = await this.getUserById(id);

    user = await prisma.activity.update({
      where: { id },
      data: newUser,
    });
    return user;
  },
};

module.exports = { UsersService };
