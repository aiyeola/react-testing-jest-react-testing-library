const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
