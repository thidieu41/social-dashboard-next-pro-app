const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "jsdom", // 👈 Quan trọng! Cho phép Jest chạy DOM
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // 👈 Thêm dòng này
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 👈 map alias @ -> src
  },
};
