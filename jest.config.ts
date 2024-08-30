/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["./node_modules"],
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/__test__/*.test.ts", "**/__test__/*_test.ts"],

};

export default config;
