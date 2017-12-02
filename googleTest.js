//Practicing how to target certain elements within the DOM

const request = require("request");
const cheerio = require("cheerio");

let title;
let time;
let url;



/*Function Initialization */

/*Assign inputs from user to variables */
function assignToVariables(){
for (let i = 2; i < process.argv.length; i++)
    {
        switch(i){
            case 2:
                title = process.argv[i];
                
            case 3:
                time = parseInt(process.argv[i]);
        }
      url = "https://www.google.ca/search?q=" + title + "+films";

    }
      //Comment out below when not needed
      console.log("The latest google search results for the film " + title + " are:");    
}



assignToVariables();

request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);
      //  temperature = $("[data-variable='temperature'] .wx-value").html();
       // temperature = $(".wu-value-to").html();
    } else {
      console.log("We’ve encountered an error: " + error);
    }
    
    
    const myArray  = [];
    $('h3').each(function(i, elem) {
        myArray[i] = $(this).text();
        });

    myArray.join(', ');
    
    for (i = 0; i < myArray.length; i++){
        console.log(myArray[i]);
    }
    
    
    });