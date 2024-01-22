const { defineConfig } = require("cypress");



module.exports = defineConfig({
  chromeWebSecurity: false,
 experimentalModifyObstructiveThirdPartyCode: true,
 experimentalOriginDependenciesL:true,
  e2e: {
   
    experimentalSessionAndOrigin: true,
    experimentalOriginDependencies:true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/integration/examples/*.js',
   
  },
  projectId: "kzy11p",
  
  
 
});


