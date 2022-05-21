const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_subpage = require('./subpage-file-generator');
module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir);
        writeLink(struct, file_name, parent_page, app_config, app_dir);
    }

}

function writeLink(struct, file_name, parent_page, app_config, app_dir)
{
    const $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
    var j=0;
    var linkText="";
    if(struct.links)
    {
        
        while(j<struct.links.length)
        {        
                if(app_config.framework=="w3css")
                {
                    linkText= '\n<a href="'+struct.links[j].caption.replace(/\s/g, '_')+'.html"><div class="column w3-card-2 w3-hover-shadow w3-center" style="width:33%">'+
                    '\n\t<span style="font-size: 48px; color: Dodgerblue;">'+
                        '\n\t\t<i class="'+struct.links[j].icon+'"></i>'+
                    '\n\t</span>'+
                    '\n\t<div class="w3-container w3-center">'+
                        '\n\t\t<p>'+struct.links[j].caption+'</p>'+
                    '\n\t</div>'+
                    '\n</div></a>';
                }
                else
                {
                    linkText='\n<a href="'+struct.links[j].caption.replace(/\s/g, '_')+'.html"><div class="column card" style="width:33%">'+
                        '\n\t<span style="font-size: 48px; color: Dodgerblue;">'+
                        '\n\t\t<i class="'+struct.links[j].icon+'"></i>'+
                        '\n\t</span>'+
                        '\n\t<div class="card-body">'+
                        '\n\t\t<h4 class="card-title">'+struct.links[j].caption+'</h4>'+
                        '\n\t</div>'+
                        '\n</div></a>';
                }    
                


                
                $("#contentTabular").append(linkText).html();
                tabularHTML=$("*").html();
                fs.writeFileSync(app_dir + '/' + file_name,tabularHTML,'utf8');
            j++
        }
 
    }
    else{
        console.log(struct.caption+" has no links object!");
    }
}