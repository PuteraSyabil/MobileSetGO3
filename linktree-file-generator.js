
const fs = require('fs-extra');
const cheerio = require('cheerio');
const pretty = require('pretty');

const fg_subpage = require('./subpage-file-generator');
const fg_footer = require('./footer-file-generator');
const link = require('fs-extra/lib/ensure/link');


module.exports={

    generate: function(struct, file_name, parent_page, app_config, app_dir)
    {
        fs.copyFileSync('layout_template/'+app_config.framework+'/'+struct.type+'/'+struct.type+'.html',app_dir + '/' + file_name);
         //to have a back button
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir);
        writeLink(struct, file_name, parent_page, app_config, app_dir);
        fg_footer.generate(struct, file_name, parent_page, app_config, app_dir)
    }
}


function writeLink(struct, file_name, parent_page, app_config, app_dir)
{
    const $ = cheerio.load(fs.readFileSync(app_dir + '/' + file_name,'utf8'));
    
    var captionText="";
    var linkText="";
    var linkName="";
    var newCol="";
    var i = 0;

    // let a = cheerio.load('<a></a>');
    // let div = cheerio.load('<div></div>');
    // let h4 = cheerio.load('<h4></h4>');
    // div('div').addClass('link-box mt-3 w3-round-xxlarge');
    if(struct.links)
    {
        while(i<struct.links.length)
        {
            //To write the link button of linktree using cheerio
            captionText = struct.links[i].caption;
            linkName = struct.links[i].caption;
            linkName =linkName.replace(/\s/g, '_');
            var newCol="";
            
            if(app_config.framework=="w3css")
            {
                linkText='\t<a href="'+linkName+'.html">'+
                '\n\t\t\t\t<br>'+
                '\n\t\t\t\t<div class="link-box mt-3 w3-round-xxlarge"> '+captionText +' link</div>'+
                '\n\t\t\t\t<br>'+
                '\n\t\t\t</a>';

                // a('a').attr('href',linkName+'.html');
                // // div('div').text(struct.links[i].caption);
                // h4('h4').text(captionText);
                // //a('a').text(captionText);
                
                // div('div').append(h4('h4'));
                
                // a('a').append(div('div'))
                
                
               
                
                
               


            }
            else
            {
                linkText='\t<a href="'+linkName+'.html">'+
                '\n\t\t\t\t<br>'+
                '\n\t\t\t\t<div class="link-box mt-3 img-rounded"> '+captionText +' link</div>'+
                '\n\t\t\t\t<br>'+
                '\n\t\t\t</a>';
            }


            
        
            // linkText=a.html()
            $('#navItem').append(linkText).html();
            navHTML=$("*").html();
            fs.writeFileSync(app_dir + '/' + file_name,pretty($.html()),'utf8');
            
            i++;
        }
            //for changing the header background colour 
            var oldCol=$('#backgroundColItem').attr('class');
            if(app_config.framework=="w3css")
            {
                newCol=('w3-container w3-'+app_config.backgroundColour)+encodeURIComponent(oldCol); 
            }
            else
            {
                newCol=('bg-'+app_config.backgroundColour)+encodeURIComponent(oldCol);
            }     
            //header recolor
            $('#backgroundColItem').attr('class',newCol).html();
            var colHTML=$('*').html();
            fs.writeFileSync(app_dir + '/' + file_name,colHTML,'utf8');
    }
    else{
        console.log(struct.caption+" has no links object!")
    }
}