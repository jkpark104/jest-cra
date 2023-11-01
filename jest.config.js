/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1", //경로의 이름과 실제 경로 설정
    "^.+\\.(css|less|scss|otf)$": "babel-jest",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
