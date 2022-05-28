const gen_template = require('./gen-template.js');
const menu_ui = require('./ui-main-menu');



const run  =async()=>{
    //to add title of the project
    menu_ui.displayMainMenuTitle();
    gen_template.run();
}

//to start the application
run()
