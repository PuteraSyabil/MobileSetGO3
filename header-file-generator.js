const fs = require('fs-extra');
const cheerio = require('cheerio');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
                //to add header title of the subpage
                var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
                $('head').append('<title>'+struct.caption+'</title>').html();
                var titleHTML=$('*').html();
                fs.writeFileSync(app_dir + '/' + file_name,titleHTML,'utf8');
    }

}
