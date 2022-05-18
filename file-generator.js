// file_generator.js
const fs = require('fs-extra');
const cheerio = require('cheerio');


let app_dir = undefined;

module.exports = {
	setAppDir: function(dir) {
		app_dir = dir;      
	},

    linktree: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate main page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },
    tab: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate main page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },
    hamburger: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate main page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },

    login: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate login page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },

    list: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate list page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },

    listPaginate: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate list-paginate page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },

    tabular: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate tabular page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },

    blank: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate blank page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },
}

// generic function to generate all type of pages and their links
function genPageLinks(struct, file_name, parent_page, app_config, parent_head) {
    if (struct.links) {
        console.log("Generate " + file_name + " page that contains links:");
        for (var idx in struct.links) {
            let file_name_link = struct.links[idx].caption + ".html";

            // formatting the file name so "hello world.html" becomes "hello_world.html"
            file_name_link = file_name_link.replace(/ /g, "_");

            console.log(struct.links[idx].caption + " -> " + file_name_link);
        }
    } else {
         console.log("Generate " + file_name + " page.");
    }

    console.log(app_config.framework);
    
    // to check if the object has a type
    if(struct.type)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
        if(struct.type!="tab"&&struct.type!="hamburger")
        {
            if(app_config.type=="tab"||app_config.type=="hamburger")
            {
                //to ensure SPA first level does not have any back button
                if(parent_page!="main.html")
                {
                    //to add a back button in the Page Link
                    var back_button=fs.readFileSync('layout_template/'+app_config.framework+'/subpage/subpage.html');
                    fs.writeFileSync(app_dir + '/' + file_name,back_button,"utf-8");
                    
                    //to add back button colour using cheerio
                    var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
                    var oldColour=$("#spanItem").attr("class");
                    var newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    $('#spanItem').attr('class',newColour).html();
                    var colSubPageHTML=$('*').html();
                    fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');

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

                    //to add back button colour using cheerio
                    var $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
                    var oldColour=$("#spanItem").attr("class");
                    var newColour=('w3-'+app_config.backgroundColour)+encodeURIComponent(oldColour);
                    $('#spanItem').attr('class',newColour).html();
                    var colSubPageHTML=$('*').html();
                    fs.writeFileSync(app_dir + '/' + file_name,colSubPageHTML,'utf8');
                    
                    //to append the content of the sublink page
                    var content=fs.readFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html');
                    fs.appendFileSync(app_dir + '/' + file_name,content);
                }
            }  
        }     
       // run function to write the navigation page link
       genNavPageLink(struct, file_name, parent_page, app_config)
    }
    else
    {
        //if the object has no type, then it will generate and blank page
        fs.writeFileSync(app_dir + '/' + file_name, '<html><body>' + file_name + '</body></html>');
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
        else if(struct.type=="hamburger")
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

                //to color the navgiation hamburger bar using cheerio
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

      if(struct.type=="hamburger")
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




