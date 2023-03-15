<<<<<<< HEAD
=======

>>>>>>> 4e3bb1a432a42209c50881791fcf5d83555804cd
const {defineConfig} = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
<<<<<<< HEAD
});
=======
});


const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

>>>>>>> 4e3bb1a432a42209c50881791fcf5d83555804cd
