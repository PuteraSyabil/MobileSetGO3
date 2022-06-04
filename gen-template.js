const fs = require('fs-extra');
const { exit } = require('process');
const fg = require('./file-generator.js');
const Config = require('./config.js');


let jsonText = fs.readFileSync('app-struct.json');
let appStruct = JSON.parse(jsonText);
console.log();
//set root config
var app_config=new Config(appStruct.root.backgroundColour, appStruct.root.framework,appStruct.root.type,appStruct.root.footer);



module.exports={
    run:function(){
        // create directory to save the generated pages
        var dir = './' + appStruct.root.appName;

        if (fs.existsSync(dir)){
        //allow user to remove/edit the json data by overwritting it
            fs.removeSync(dir);

            fs.mkdirSync(dir);
        }
        else{
            fs.mkdirSync(dir);
        }
        //to set working directory in file-generator.js
        fg.setAppDir(dir);


        // starting point of recursive function calls
        if(!(appStruct.root.type == "linktree"||appStruct.root.type == "tab"||appStruct.root.type == "sidebar"))
        {
            console.log("root type is not main page")
            exit(0);
        }
        if(!(appStruct.root.framework=="w3css"||appStruct.root.framework=="bootstrap"))
        {
            console.log("root framework is not defined")
            exit(0);
        }
        else{
            displayConfig();
            // starting point of recursive function calls
            traverseStruct(appStruct.root, null);
        }


    }

}

// Recursive function to traverse page structure
function traverseStruct(struct, parent_page) {
    
    var file_name = undefined;

    file_name = struct.caption + ".html";
    if (struct.type == "linktree"||struct.type == "tab"||struct.type == "sidebar") {
        if(parent_page==null)
        {
            file_name = "main.html";
        }
        
    }

    // formatting the file name so "hello world.html" becomes "hello_world.html"
    file_name = file_name.replace(/ /g, "_");

    generateFile(struct, file_name, parent_page,app_config);
    console.log();

    // if current page has links to other page
    if (struct.links) {
   
        for (var idx in struct.links) {
            // each node is actually other sub-page structure
            
            
                console.log("Traverse sub page structure: " + struct.links[idx].caption);
            
                //restriction on if theres any SPA object not root, it will terminate the generation
                if(struct.links[idx].type=="tab"||struct.links[idx].type=="sidebar")
                {
                    console.log("Object "+struct.links[idx].type+" is a Single Page Application! For root only!")
                    exit(0);
                }
                else
                {
                    // recursive call to "traverseStruct" function
                    traverseStruct(struct.links[idx], file_name );
                }
            
            
            
        }
    }
}

// function to choose and executre file generator function from file-generator.js
function generateFile(struct, file_name, parent_page, app_config) {
    if (struct.type == "linktree") {
        fg.linktree(struct, file_name, parent_page, app_config);

    } else if(struct.type=="tab"){
        fg.tab(struct, file_name, parent_page, app_config);

    } else if(struct.type=="sidebar"){
        fg.sidebar(struct, file_name, parent_page, app_config);

    } else if (struct.type == "login") {
        fg.login(struct, file_name, parent_page, app_config);

    }  else if (struct.type == "list") {
        fg.list(struct, file_name, parent_page, app_config);

    } else if (struct.type == "list-paginate") {
        fg.listPaginate(struct, file_name, parent_page, app_config);

    } else if (struct.type == "tabular") {
        fg.tabular(struct, file_name, parent_page, app_config);

    } else if (struct.type=="row-button") {
        fg.row_button(struct, file_name, parent_page, app_config);

    } else {
        fg.blank(struct, file_name, parent_page, app_config);
    }
}

function displayConfig()
{
            console.log("The root of the application is set with: ");
            console.log("Application name of: "+appStruct.root.appName);
            console.log("Framework of: "+ appStruct.root.framework);
            console.log("Main Menu type of: "+ appStruct.root.type);
            console.log("Background Colour of: "+ appStruct.root.backgroundColour);
            console.log("Footer caption of: "+appStruct.root.footer);
            console.log();
            console.log("Now generating of the pages...");
            console.log();
            console.log();
}