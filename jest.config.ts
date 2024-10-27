import type {Config} from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': '<rootDir>__mocks__/styleMock.ts'
      },
      fakeTimers: {
        doNotFake: ['nextTick'],
        timerLimit: 1000,
      },
};

export default config;

