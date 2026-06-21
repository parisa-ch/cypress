const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://evo.dev.theysaid.io/",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    downloadsFolder: "cypress/downloads",
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
