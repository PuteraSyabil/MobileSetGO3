
const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_header = require('./header-file-generator');

module.exports={

    
    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        //to write the subpage back button
        if(struct.type)
        {
    
            writeBackButtonTypeObject(struct, file_name, parent_page, app_config, app_dir)
        }
        else{
            writeBackButtonNoTypeObject(struct, file_name, parent_page, app_config, app_dir)
        }
        //to change the header title to file name 
        fg_header.generate(struct, file_name, parent_page, app_config, app_dir)
    }
    
}

function writeBackButtonTypeObject(struct, file_name, parent_page, app_config, app_dir)
{
    var newColour="";
    if(struct.type!="tab"&&struct.type!="sidebar")
        {
            if(app_config.type=="tab"||app_config.type=="sidebar")
            {
                //to ensure SPA first level does not have any back button
                if(parent_page!="main.html")
                {
                    //to add a back button in the Page Link
                    var back_button=fs.readFileSync('layout_template/'+app_config.framework+'/subpage/subpage.html');
                    fs.writeFileSync(app_dir + '/' + file_name,back_button,"utf-8");
                    
                    
                    var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));

                    //to add back button colour using cheerio
                    var oldColour=$("#spanItem").attr("class");
                    if(app_config.framework=="w3css")
                    {
                        newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }
                    else
                    {
                        newColour = ('bg-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }

                    $('#spanItem').attr('class',newColour).html();
                    var colSubPageHTML=$('*').html();
                    fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');
                    

                    //to append content web
                    var content=fs.readFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html');
                    fs.appendFileSync(app_dir + '/' + file_name,content);
                }
            }
            else
            {
                //to ensure MPA have back button in the page link
                if(parent_page!=null)
                {
                    //to add a back button in the Page Link
                    var back_button=fs.readFileSync('layout_template/'+app_config.framework+'/subpage/subpage.html');
                    fs.writeFileSync(app_dir + '/' + file_name,back_button,"utf-8");

                    //to add current name page in the tab bar
                    var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
                    $("#spanItem").append(struct.caption).html();
                    var namePageHTML=$("*").html();
                    fs.writeFileSync(app_dir + '/' + file_name,namePageHTML,'utf8');


                    //to add back button colour using cheerio
                    var oldColour=$("#spanItem").attr("class");
                    
                    if(app_config.framework=="w3css")
                    {
                        newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }
                    else
                    {
                        newColour = ('bg-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }

                    $('#spanItem').attr('class',newColour).html();
                    var colSubPageHTML=$('*').html();
                    fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');
                    
                    //to append the content of the sublink page
                    var content=fs.readFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html');
                    fs.appendFileSync(app_dir + '/' + file_name,content);
                }
            }  
        }
}

function writeBackButtonNoTypeObject(struct, file_name, parent_page, app_config, app_dir)
{
    
        if(app_config.type=="tab"||app_config.type=="sidebar")
        {
            //to ensure SPA first level does not have any back button
            if(parent_page!="main.html")
            {
                //to add a back button in the Page Link
                var back_button=fs.readFileSync('layout_template/'+app_config.framework+'/subpage/subpage.html');
                fs.writeFileSync(app_dir + '/' + file_name,back_button,"utf-8");
                
                
                var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));

                //to add back button colour using cheerio
                var oldColour=$("#spanItem").attr("class");
                if(app_config.framework=="w3css")
                    {
                        newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }
                    else
                    {
                        newColour = ('bg-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    }
                $('#spanItem').attr('class',newColour).html();
                var colSubPageHTML=$('*').html();
                fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');

                //to append content web
                fs.appendFileSync(app_dir + '/' + file_name,file_name);
            }
            //to write a blank page incase subpage link has no type
            else if(parent_page=="null")
            {
                
                fs.writeFileSync(app_dir + '/' + file_name, '<html><body>' + file_name + '</body></html>');
            }
            else{
                
                fs.appendFileSync(app_dir + '/' + file_name,file_name);
               
            }
        }
        else
        {
            //to ensure MPA have back button in the page link
            if(parent_page!=null)
            {
                //to add a back button in the Page Link
                var back_button=fs.readFileSync('layout_template/'+app_config.framework+'/subpage/subpage.html');
                fs.writeFileSync(app_dir + '/' + file_name,back_button,"utf-8");

                //to add current name page in the tab bar
                var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
                $("#spanItem").append(struct.caption).html();
                var namePageHTML=$("*").html();
                fs.writeFileSync(app_dir + '/' + file_name,namePageHTML,'utf8');


                //to add back button colour using cheerio
                var oldColour=$("#spanItem").attr("class");
                if(app_config.framework=="w3css")
                {
                    newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                }
                else
                {
                    newColour = ('bg-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                }
                $('#spanItem').attr('class',newColour).html();
                var colSubPageHTML=$('*').html();
                fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');
                
                //to append the content of the sublink page
                fs.appendFileSync(app_dir + '/' + file_name,file_name);
            }
        }  
    
    
}