
const fs = require('fs-extra');
const cheerio = require('cheerio');
const fg_back_button = require('./back-button-file-generator');




module.exports={
    generate(struct, file_name, parent_page, app_config, app_dir)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        fg_back_button.generate(struct, file_name, parent_page, app_config, app_dir)
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
        while(i <struct.links.length)
        {
            //to write the tab navigation bar using cheerio
            captionText = struct.links[i].caption;
            linkName = struct.links[i].caption;
            linkName =linkName.replace(/\s/g, '_');
            if(app_config.framework=="w3css")
            {
                if(i==0)
                {
                    linkText ='\n\t\t<a href="#/!" class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+'</a>\n'
                }
                else{
                    linkText = '\n\t\t<a href="#!'+linkName+'"  class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+' Link</a>\n'
                }
            }
            else
            {
                if(i==0)
                {
                    linkText ='\n\t\t<li><a href="#/!">'+captionText+'</a></li>\n'
                }
                else{
                    linkText = '\n\t\t<li><a href="#!'+linkName+'">'+captionText+'</a></li>\n'
                }
            }
            
        
            $('#navItem').append(linkText).html();
            navHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');

            i++;
        }

        //to coor the navigation bar
        var oldNavCol=$('#navItem').attr('class'); 
        var oldFooterCol=$('#footerItem').attr('class');
        var newNavCol="";
        var newFooterCol="" ;

         //nav recolor
        if(app_config.framework=="w3css")
        {
            newNavCol=('w3-bar w3-'+app_config.backgroundColour)+encodeURIComponent(oldNavCol);   
            newFooterCol=('w3-container w3-padding-32 w3-center w3-'+app_config.backgroundColour)+encodeURIComponent(oldFooterCol);
            $('#navItem').attr('class',newNavCol).html();
        }
        else
        {
            oldNavCol=$('#navItemCol').attr('class'); 
            newNavCol=('navbar text-center bg-'+app_config.backgroundColour)+encodeURIComponent(oldNavCol);  
            $('#navItemCol').attr('class',newNavCol).html(); 
        }
  
        var colHTML=$('*').html();
        //abaikan footer dulu
        // //footer recolor
        // $('#footerItem').attr('class',newFooterCol).html();
        colHTML=$('*').html();
        fs.writeFileSync(app_dir + '/' + file_name,colHTML,'utf8');

        //to create a JS file for the SPA main page to link with subpage.
        createLinkJSFile(struct, file_name, parent_page, app_config,app_dir)
    }
    else{
        console.log(struct.caption+" has no links object!")
    }
}

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
      fs.writeFileSync(app_dir  +'/link.js',linkJS,'utf8');  
}


