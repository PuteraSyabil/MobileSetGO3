
const fs = require('fs-extra');
const cheerio = require('cheerio');





module.exports={
    setAppDir: function(dir) {
		app_dir = dir;      
	},
    generate(struct, file_name, parent_page, app_config, app_dir)
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
                    if(i==0)
                    {
                        linkText ='\n\t\t<a href="#/!" class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+'</a>\n'
                    }
                    else{
                        linkText = '\n\t\t<a href="#!'+linkName+'"  class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+' Link</a>\n'
                    }
                
                    $('#navItem').append(linkText).html();
                    navHTML=$("*").html();
                    fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');

                    i++;
                }

                //to coor the navigation bar
                var oldNavCol=$('#navItem').attr('class'); 
                var oldFooterCol=$('#footerItem').attr('class');
                var newNavCol=('w3-bar w3-'+app_config.backgroundColour)+encodeURIComponent(oldNavCol);   
                var newFooterCol=('w3-container w3-padding-32 w3-center w3-'+app_config.backgroundColour)+encodeURIComponent(oldFooterCol); 

                //nav recolor
                $('#navItem').attr('class',newNavCol).html();
                var colHTML=$('*').html();
                //footer recolor
                $('#footerItem').attr('class',newFooterCol).html();
                colHTML=$('*').html();
                fs.writeFileSync(app_dir + '/' + file_name,colHTML,'utf8');

                //to create a JS file for the SPA main page to link with subpage.
                createLinkJSFile(struct, file_name, parent_page, app_config)
            }
            else{
                console.log(struct.caption+" has no links object!")
            }
        
    }

}


// function to write the navigation page link in the HTML code
var genNavPageLink = function(struct, file_name, parent_page, app_config){   



    const $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
    
    var captionText="";
    var linkText="";
    var linkName="";
    var i = 0;

    if(app_config.framework=="w3css")
    {
        if(struct.type=="linktree")
        {
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
                    navHTML=$("*").html();
                    fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');
                    
                    i++;
                }
                    //for changing the background colour
                    var oldCol=$('#backgroundColItem').attr('class');
                    var newCol=('w3-container w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol); 
                    
                    //header recolor
                    $('#backgroundColItem').attr('class',newCol).html();
                    var colHTML=$('*').html();
                    fs.writeFileSync(app_dir + '/' + file_name,colHTML,'utf8');
            }
            else{
                console.log(struct.caption+" has no links object!")
            }
        
        }
        else if(struct.type=="tab")
        {
            if(struct.links)
            {
                while(i <struct.links.length)
                {
                    //to write the tab navigation bar using cheerio
                    captionText = struct.links[i].caption;
                    linkName = struct.links[i].caption;
                    linkName =linkName.replace(/\s/g, '_');
                    if(i==0)
                    {
                        linkText ='\n\t\t<a href="#/!" class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+'</a>\n'
                    }
                    else{
                        linkText = '\n\t\t<a href="#!'+linkName+'"  class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+' Link</a>\n'
                    }
                
                    $('#navItem').append(linkText).html();
                    navHTML=$("*").html();
                    fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');

                    i++;
                }

                //to coor the navigation bar
                var oldNavCol=$('#navItem').attr('class'); 
                var oldFooterCol=$('#footerItem').attr('class');
                var newNavCol=('w3-bar w3-'+app_config.backgroundColour)+encodeURIComponent(oldNavCol);   
                var newFooterCol=('w3-container w3-padding-32 w3-center w3-'+app_config.backgroundColour)+encodeURIComponent(oldFooterCol); 

                //nav recolor
                $('#navItem').attr('class',newNavCol).html();
                var colHTML=$('*').html();
                //footer recolor
                $('#footerItem').attr('class',newFooterCol).html();
                colHTML=$('*').html();
                fs.writeFileSync(app_dir + '/' + file_name,colHTML,'utf8');

                //to create a JS file for the SPA main page to link with subpage.
                createLinkJSFile(struct, file_name, parent_page, app_config)
            }
            else{
                console.log(struct.caption+" has no links object!")
            }
            
        }
        else if(struct.type=="sidebar")
        {
            if(struct.links)
            {
                while(i <struct.links.length)
                {
                    captionText = struct.links[i].caption;
                    linkName = struct.links[i].caption;
                    linkName =linkName.replace(/\s/g, '_');
                    if(i==0)
                    {
                        linkText ='\n\t\t\t\t<a href="#/!" class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+'</a>\n'
                    }
                    else{
                        linkText = '\n\t\t\t\t<a href="#!'+linkName+'"  class="w3-bar-item w3-button w3-mobile" id="'+captionText+'">'+captionText+' Link</a>\n'
                    }
                
                    $('[name=navItem]').append(linkText).html();
                    navHTML=$("*").html();
                    fs.writeFileSync(app_dir + '/' + file_name,navHTML,'utf8');

                    i++;
                }

                //to color the navgiation sidebar bar using cheerio
                var oldCol=$('#backgroundColItem').attr('class');
                var newCol=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol);

                $('#backgroundColItem').attr('class',newCol).html();

                var colHTML=$('*').html();
                fs.writeFileSync(app_dir+'/'+file_name,colHTML,'utf8');

                //To create a JS file for SPA link
                createLinkJSFile(struct, file_name, parent_page, app_config)
            }
            else{
                console.log(struct.caption+" has no links object!");
            }
            
        }
        else if(struct.type=="tabular")
        {
            if(struct.links)
            {
                var j=0;
                while(j<struct.links.length)
                {               
                        var tempLi= '\n<a href="'+struct.links[j].caption.replace(/\s/g, '_')+'.html"><div class="column w3-card-2 w3-hover-shadow w3-center" style="width:33%">'+
                        '\n\t<span style="font-size: 48px; color: Dodgerblue;">'+
                            '\n\t\t<i class="'+struct.links[j].icon+'"></i>'+
                        '\n\t</span>'+
                        '\n\t<div class="w3-container w3-center">'+
                          '\n\t\t<p>'+struct.links[j].caption+'</p>'+
                        '\n\t</div>'+
                      '\n</div></a>'
                        
                        fs.appendFileSync(app_dir + '/' + file_name,tempLi);
                   j++
                }
                fs.appendFileSync(app_dir + '/' + file_name,'\n</div>');
            }
            else{
                console.log(struct.caption+" has no links object!");
            }
        }
        
        
    }
    
}

//function to create a angular routing link file for SPA only
var createLinkJSFile = function(struct, file_name, parent_page, app_config)
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

      if(struct.type=="sidebar")
      {
        linkJS+='function w3_open() {'+
            'document.getElementById("mySidebar").style.display = "block";'+
        '}'+
        
        'function w3_close() {'+
            'document.getElementById("mySidebar").style.display = "none";'+
        '}';
      }
      fs.writeFileSync(app_dir  +'/link.js',linkJS,'utf8');  
}
