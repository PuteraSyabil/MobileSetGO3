const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_back_button = require('./back-button-file-generator');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {  
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        fg_back_button.generate(struct, file_name, parent_page, app_config, app_dir); 
    }
}

