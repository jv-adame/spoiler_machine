//Testing Cheerio .each function and DOM manipulation

var request = require("request"),
cheerio = require("cheerio"),
url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=02888";

request(url, function (error, response, body) {
if (!error) {
  var $ = cheerio.load(body),
  //  temperature = $("[data-variable='temperature'] .wx-value").html();
    temperature = $(".wu-value-to").html();
  console.log("It’s " + temperature + " degrees Fahrenheit.");
} else {
  console.log("We’ve encountered an error: " + error);
}


const myArray  = [];
for (i = 0; i < 5; i++)
{
    $('li').each(function(i, elem) {
        myArray[i] = $(this).text();
       });
}


myArray.join(', ');


console.log(myArray);

});