export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/setup-tests.js"
  ],
  testEnvironment: "jsdom",
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/lib/"
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
