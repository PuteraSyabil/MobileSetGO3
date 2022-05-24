const gen_template = require('./gen-template.js');
const menu_ui = require('./ui-main-menu');



const run  =async()=>{
    menu_ui.mainMenuTitle();
    gen_template.run();
}

run()
