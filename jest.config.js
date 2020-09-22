module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: [
    "/src/infrastructure/",
    "/src/adapters/",
    "/src/application/mocks/",
    "/src/application/shared/",
    "/src/index.ts",
    "/src/fbCreds.json",
  ],
};
