export default {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ["<rootDir>/src/utils/__tests__/fixtures/"],
  collectCoverage: true
};
