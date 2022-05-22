const fs = require('fs-extra');
const cheerio = require('cheerio');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        //to load cherio on the selected file
        var $ = cheerio.load(fs.readFileSync(app_dir+'/'+file_name,'utf8'));
        //to add class type using w3css on the footer
        var oldCol = $("#footerItem").attr('class');
        //script to add colour on the footer
        if(app_config.framework=="w3css")
        {
            
            var newCol = ('w3-container w3-padding-32 w3-center w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol);

        }
        else
        {
            var newCol=('bg-'+app_config.backgroundColour)+encodeURIComponent(oldCol);
        }
        //to add colour to the footer
        $("#footerItem").attr('class',newCol).html();
        var footerColHTML=$('*').html();
        fs.writeFileSync(app_dir+'/'+file_name,footerColHTML,'utf-8');

        //to add footer caption
        if(app_config.footer!=null)
        {
            $("#footerItem").append('<h4>'+app_config.footer+'</h4>');
            footerColHTML=$('*').html();
            fs.writeFileSync(app_dir+'/'+file_name,footerColHTML,'utf-8');
        }

        
    }

}