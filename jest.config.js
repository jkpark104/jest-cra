/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transform: {
    "^.+\\.(css|scss)$": "jest-transform-css",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
