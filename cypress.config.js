const { defineConfig } = require("cypress");
const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    "charts": true,
    "overwrite": false,
    "html": false,
    "json": true,
    "reportDir": "cypress/report/mochawesome-report"
  },
  e2e: {
    specPattern: 'cypress/e2e/**/**.cy.js',
    viewportWidth: 1400,
    viewportHeight: 1200,
    video: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 6000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      APP_URL: 'https://automationexercise.com',
      codeCoverageTasksRegistered: true,
      grepFilterSpecs: false,
      grepOmitFiltered: false,
      coverage: false,
      CHECKOUT_TIMEOUT: 50000,
      API_RETRY_ATTEMPTS: 10,
      API_TIMEOUT: '50000',
    },
    compilerOptions: {
      types: ['cypress', 'cypress-xpath'],
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const options = {
        webpackOptions: require('./webpack.config'),
        watchOptions: {},
      };
    
      on('file:preprocessor', webpackPreprocessor(options));
    },
  },
});
