const fs = require('fs-extra');
const cheerio = require('cheerio');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        var $ = cheerio.load(fs.readFileSync(app_dir+'/'+file_name,'utf8'));

        var oldCol = $("#footerItem").attr('class');
        if(app_config.framework=="w3css")
        {
            
            var newCol = ('w3-container w3-padding-32 w3-center w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol);

        }
        else
        {
            var newCol=('bg-'+app_config.backgroundColour)+encodeURIComponent(oldCol);
        }
        $("#footerItem").attr('class',newCol).html();
            var footerColHTML=$('*').html();

            fs.writeFileSync(app_dir+'/'+file_name,footerColHTML,'utf-8');
    }

}