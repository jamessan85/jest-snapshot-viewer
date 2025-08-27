module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  // Additional directories to check for snapshots
  snapshotSerializers: [],
  // Set directories where Jest should look for snapshots
  roots: [
    "<rootDir>/src"
  ],
  // Ignore node_modules when transforming
  transformIgnorePatterns: [
    "/node_modules/"
  ],
};
