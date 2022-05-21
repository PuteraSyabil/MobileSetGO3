
const fs = require('fs-extra');
const cheerio = require('cheerio');

const fg_subpage = require('./subpage-file-generator');


module.exports={

    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
         //to have a back button
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir);
        writeLink(struct, file_name, parent_page, app_config, app_dir);
    }
}

function writeLink(struct, file_name, parent_page, app_config, app_dir)
{
    const $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
    
    var captionText="";
    var linkText="";
    var linkName="";
    var i = 0;
    if(struct.links)
    {
        while(i<struct.links.length)
        {
            //To write the link button of linktree using cheerio
            captionText = struct.links[i].caption;
            linkName = struct.links[i].caption;
            linkName =linkName.replace(/\s/g, '_');
            
            linkText='\t<a href="'+linkName+'.html">'+
            '\n\t\t\t\t<br>'+
            '\n\t\t\t\t<div class="link-box mt-3 w3-round-xxlarge"> '+captionText +' link</div>'+
            '\n\t\t\t\t<br>'+
            '\n\t\t\t</a>';

            $('#navItem').append(linkText).html();
            rowButtonHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,rowButtonHTML,'utf8');
            
            i++;
        }

    }
    else{
        console.log(struct.caption+" has no links object!")
    }
}