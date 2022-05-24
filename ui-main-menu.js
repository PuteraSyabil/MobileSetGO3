const figlet = require('figlet')

module.exports = {

    mainMenuTitle: () =>
      console.log(`${
        
          figlet.textSync(' MobileSetGO ', {
            horizontalLayout: 'full',
          })
        }
        \n======================Auto Generate Mobile Page Design Tool======================\n
        
        `)
  }