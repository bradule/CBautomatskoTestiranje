const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
