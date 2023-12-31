module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest-setup.js", "./src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|png|jpg)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
  },
};
