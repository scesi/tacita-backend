/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended');

const { prisma } = require('./client');

/**
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 * @typedef {import('jest-mock-extended').DeepMockProxy<PrismaClient>} PrismaMock
 */

/**@type {PrismaMock}*/
const prismaMock = prisma;

jest.mock('./client', () => mockDeep());

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = { prismaMock };
