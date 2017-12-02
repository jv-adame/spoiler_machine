const request = require("request");
const cheerio = require("cheerio");

let title;
let time;
let googleUrl;
let mdbUrl;

/*Function Initialization */
/*this is a test */
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
      googleUrl = "https://www.google.ca/search?q=" + title + "+films";
      mdbUrl = "https://api.themoviedb.org/3/search/movie?api_key=5eeaad4ac3a43cd6febdd3c9fa9de490&query=" + title;
      }
}

/*Spoiler Printer*/
function printThis(){

  request(mdbUrl, function (error, response, body) {
    if (!error) {
       var json_object = JSON.parse(body);
    } else {
      console.log("We’ve encountered an error: " + error);
    }


  /*Check if valid movie was inputted by user.  When the API is given an invalid movie query, the results object from the json returned is empty.  Therefore the returned array will not have any entries populating it*/


    if (!json_object.results[0])
    {
      console.log("Please provide a valid movie for us to search");
    }
    else{
        /*Turns out the .json object returned is an array so I targeted the first array where the overview was actually located */
        
        let spoiler = json_object.results[0].overview;
        console.log(spoiler);
    }

  });
}

//Scraping Stuff
function scrape(){
  request(googleUrl, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
      } else {
        console.log("We’ve encountered an error: " + error);
      }
      
      const myArray  = [];
      //Only the headlines were rendered with the h3 element on the google html
      $('h3').each(function(i, elem) {
          myArray[i] = $(this).text();
          });

      myArray.join(', ');
      console.log("The latest google search results for the film " + title + " are:");  
      for (i = 0; i < myArray.length; i++){
          console.log(myArray[i]);
      }
      
    });
}

/*Function Execution in order:*/

assignToVariables();

/*Input Checks */
if (!time){
  console.log("Please enter a valid time in seconds");
}
/*Arbitrary number but long enough to prevent breakage */
else if (time > 60){
  console.log("Do you honestly want to wait over a minute for this app to do anything?");
}
else
{
  console.log("**spoiler warning** about to spoil the movie " + title +  " in " + time + " seconds");

  setTimeout(printThis, (time * 1000));
  scrape();
  
}


