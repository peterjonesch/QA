const { defineConfig } = require("cypress");



module.exports = defineConfig({
  chromeWebSecurity: false,
 experimentalModifyObstructiveThirdPartyCode: true,
 experimentalOriginDependenciesL:true,
  e2e: {
   
    experimentalSessionAndOrigin: true,
    experimentalOriginDependencies:true,

    setupNodeEvents(on, config) {



    },
    specPattern:'cypress/integration/examples/*.js',
   
  },
  projectId: "kzy11p",
  
  
 
});


