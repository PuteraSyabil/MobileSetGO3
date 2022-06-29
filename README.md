# Welcome to MobileSetGO - Auto Generate Mobile Page Design Tool

1) To start using the generator, the user need to create a JSON file name as "app-struct.json"
2) The user need to create an object and the add a root attribute in the object. The root type object is refering to the main page or the landing page of the generated mobile web
3) The root object can has 6 main attribute:
    i)appName: This is for the name of the mobile web application to be generated

    ii)framework: This is for the framework to be use in the mobile web application. There are 2 framework that can be inserted either {w3css,bootstrap}

    iii)type: Type is the layout of the page to be selected, for root object there are only 3 type can be inserted either {linktree, tab, sidebar}

    iv)backgroundColour: This attribute will set the background colour of the generated mobile web page. The 

    v)footer: This attribute will set the caption of the footer in the main page.

    vi)links: This attribute puposely to link a page to another page. It is an array type thus the user can add multiple subpages this

4) The user can add links attribute to main page or subpages. For subpages it must be a link navigation type page layout such as {row-button,list,list-paginate, tabular}

5) End page subpages type can be either {list,list-paginate, login}. However to page list and list-paginate and end page subpage, the user need to add items array attribute 

6) Once the user has finished structuring the mobile web application, the user can run the project by running node index.js


Example of JSON configure is below :

{
    "root":{ 
      "framework":"w3css",
      "appName":"test",
      "type":"linktree",
      "backgroundColour":"black",
      "footer":"copyright demo application 2022",
      "links":[
        {"caption":"Parent Page 1", "type":"login"},
        {"caption":"Parent Page 2","type":"tabular", "links":[
          {"caption":"Child Page 1","icon":"fa-solid fa-school"},
          {"caption":"Child Page 2"}
        ]},
        {"caption":"Parent Page 3","type":"list", "items":[
          {"caption":"Child Page 3"},
          {"caption":"Child Page 4"}
        ]}
      ]
    }
}




