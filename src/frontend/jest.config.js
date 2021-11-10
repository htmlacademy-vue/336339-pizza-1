module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["<rootDir>/.jest/register-context.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
