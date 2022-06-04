const fs = require('fs-extra');
const cheerio = require('cheerio');
const { exit } = require('process');
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
    var i = 0;
    var captionText="";
    var linkName="";
    var tempLi="";
    var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
   
    if(struct.links)
    {
        while(i<struct.links.length)
        {
            
            //to write the link caption button of list
            captionText = struct.links[i].caption;
            linkName = struct.links[i].caption;
            linkName =linkName.replace(/\s/g, '_');

            if(app_config.framework=="w3css")
            {
                tempLi='<a href="'+linkName+'.html" style="text-decoration:none;color=black;"><li class="w3-padding-large"><span class="w3-large">'+struct.links[i].caption+'</li></a>\n'
            }
            else
            {
                tempLi='<a href="'+linkName+'.html" style="text-decoration:none;color=black;"><li class="list-group-item"><h5>'+struct.links[i].caption+'</h5></li></a>\n'
            }
            

            //to append cheerio object to the file
            $("#contentList").append(tempLi).html();
            listHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,listHTML,'utf8');

            
             i++
        }
    }
    else if(struct.items)
    {
        while(i<struct.items.length)
        {
            //To end the program if subpage has no caption
            if(!struct.items[i].caption)
            {
                console.log();
                console.log("A subpage has no caption program will terminate");
                exit(0);
            }
            //to write the link caption button of list
            captionText = struct.items[i].caption;
            linkName = struct.items[i].caption;
            linkName =linkName.replace(/\s/g, '_');

            
            if(app_config.framework=="w3css")
            {
                tempLi='<li class="w3-padding-large"><span class="w3-large">'+struct.items[i].caption+'</li>\n';
                
            }
            else
            {
                tempLi='<li class="list-group-item"><h5>'+struct.items[i].caption+'</h5></li>\n'
            }

            //to append cheerio object to the file
            $("#contentListPaginate").append(tempLi).html();
            listHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,listHTML,'utf8');

            
             i++
        }
    }
    else
    {
        console.log("List item does not have any links or items")
    }
    
}
