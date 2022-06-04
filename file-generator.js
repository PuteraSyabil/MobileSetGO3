const fs = require('fs-extra');
const cheerio = require('cheerio');
const { exit } = require('process');
const fg_login = require('./login-file-generator');
const fg_linktree = require('./linktree-file-generator');
const fg_tabular = require('./tabular-file-generator');
const fg_sidebar = require('./sidebar-file-generator');
const fg_tab = require('./tab-file-generator');
const fg_list = require('./list-file-generator');
const fg_list_paginate = require('./list-paginate-file-generator');
const fg_subpage = require('./subpage-file-generator');
const fg_row_button = require('./row-button-file-generator');


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
    sidebar: function(struct, file_name, parent_page, app_config) {
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
    row_button: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate row button page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    },
    blank: function(struct, file_name, parent_page, app_config) {
        console.log("Run logic to generate blank page.");
        console.log("Parent page is " + parent_page);
        parent_head=parent_page;
        genPageLinks(struct, file_name, parent_page, app_config, parent_head);
    }
}

// generic function to generate all type of pages and their links
function genPageLinks(struct, file_name, parent_page, app_config, parent_head) {
    if (struct.links) {
        console.log("Generate " + file_name + " page that contains links:");
        for (var idx in struct.links) {
            //to exit the program incase the captio is not there
            if(!struct.links[idx].caption)
            {
                console.log();
                console.log("A subpage has no caption program will terminate");
                exit(0);
            }
            let file_name_link = struct.links[idx].caption + ".html";

            // formatting the file name so "hello world.html" becomes "hello_world.html"
            file_name_link = file_name_link.replace(/ /g, "_");

            console.log(struct.links[idx].caption + " -> " + file_name_link);
        }
    } else {
         console.log("Generate " + file_name + " page.");
    }
    
    
        if(struct.type)
        {
            genNavPageLinks(struct, file_name, parent_page, app_config,app_dir);
        }
        else
        {
            
             fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir);
        }
       
}

function genNavPageLinks(struct, file_name, parent_page, app_config, app_dir)
{
    
    if(struct.type=="tab")
    {
        fg_tab.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="sidebar")
    {
        fg_sidebar.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="linktree")
    {
        fg_linktree.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="tabular")
    {
        fg_tabular.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="login")
    {
        fg_login.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="list")
    {
        fg_list.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="list-paginate")
    {
        fg_list_paginate.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else if(struct.type=="row-button")
    {
        fg_row_button.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    else
    {
        fg_subpage.generate(struct, file_name, parent_page, app_config, app_dir);
    }
    
    
}



