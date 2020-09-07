module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: [
    "./src/infrastructure/",
    "./src/adapters/",
    "./src/application/shared/",
  ],
};
