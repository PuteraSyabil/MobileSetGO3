
const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_subpage = require('./subpage-file-generator');
const fg_footer = require('./footer-file-generator');


module.exports={
    generate(struct, file_name, parent_page, app_config, app_dir)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir)  
        writeLink(struct, file_name, parent_page, app_config, app_dir);
        fg_footer.generate(struct, file_name, parent_page, app_config, app_dir);
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
        while(i <struct.links.length)
        {
            captionText = struct.links[i].caption;
            linkName = struct.links[i].caption;
            linkName =linkName.replace(/\s/g, '_');
            if(app_config.framework=="w3css")
            {
                if(i==0)
                {
                    linkText ='\n\t\t\t\t<a href="#/!" class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+'</a>\n'
                }
                else{
                    linkText = '\n\t\t\t\t<a href="#!'+linkName+'"  class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+' Link</a>\n'
                }
            }
            else
            {
                if(i==0)
                {
                    linkText ='\n\t\t\t\t\t\t\t\t\t<li><a href="#/!">'+captionText+'</a></li>\n'
                }
                else{
                    
                    linkText = '\n\t\t\t\t\t\t\t\t<li><a href="#!'+linkName+'">'+captionText+'</a></li>\n'
                }
            }
        
            $('[name=navItem]').append(linkText).html();
            navHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');

            i++;
        }

        //to color the navgiation sidebar bar using cheerio
        var oldCol=$('#backgroundColItem').attr('class');
        var newCol="";

        if(app_config.framework=="w3css")
        {
            newCol=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol);
        }
        else
        {
            newCol=('bg-'+app_config.backgroundColour)+encodeURIComponent(oldCol);
        }
       

        $('#backgroundColItem').attr('class',newCol).html();

        var colHTML=$('*').html();
        fs.writeFileSync(app_dir+'/'+file_name,colHTML,'utf8');

        //To create a JS file for SPA link
        createLinkJSFile(struct, file_name, parent_page, app_config, app_dir)
    }
    else{
        console.log(struct.caption+" has no links object!");
    }
}

//function to create a angular routing link file for SPA only
var createLinkJSFile = function(struct, file_name, parent_page, app_config,app_dir)
{
    var i= 0;
    var linkText="";
    var linkName="";
    
     var linkJS = 'var app = angular.module("myApp", ["ngRoute"]);'+
    '\n\tapp.config(function($routeProvider) {'+
      '\n\t\t$routeProvider';

      while(i <struct.links.length)
      {
        linkName=struct.links[i].caption;
        linkName=linkName.replace(/\s/g, '_');
          if(i==0)
          {
            linkText = '\n\t\t.when("/", {templateUrl : "'+linkName+'.html"})\n\t\t'
          }
          else
          {
            linkText = '\n\t\t.when("/'+linkName+'", {templateUrl : "'+linkName+'.html"})\n\t\t'
          }
          linkJS+=linkText;
          i++
      }
      
      linkJS+='\n});';

      
        linkJS+='function w3_open() {'+
            'document.getElementById("mySidebar").style.display = "block";'+
        '}'+
        
        'function w3_close() {'+
            'document.getElementById("mySidebar").style.display = "none";'+
        '}';
      
      fs.writeFileSync(app_dir  +'/link.js',linkJS,'utf8');  
}