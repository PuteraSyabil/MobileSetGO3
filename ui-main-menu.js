const figlet = require('figlet')

module.exports = {

    displayMainMenuTitle: () =>
      console.log(`${
        
          figlet.textSync(' MobileSetGO ', {
            horizontalLayout: 'full',
          })
        }
        \n======================Auto Generate Mobile Page Design Tool======================\n
        
        `)
  }