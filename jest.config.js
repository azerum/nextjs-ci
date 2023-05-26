/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Add support for `@/` import alias
  moduleNameMapper: {
    'node-fetch': 'node-fetch-commonjs',
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
