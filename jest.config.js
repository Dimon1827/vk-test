/** @type {import('jest').Config} */
const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}', // Добавил ts/tsx
    '!src/**/index.{js,ts}',
    '!src/main.{jsx,tsx}',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Объединил в одно правило
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1', 
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

export default config;
