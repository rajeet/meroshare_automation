require('dotenv').config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://meroshare.cdsc.com.np/", 
    projectId: "7mq8wz",
    env:{...process.env},
  },
});
