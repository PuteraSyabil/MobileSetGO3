const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_subpage = require('./subpage-file-generator');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {  
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir); 
    }
}

