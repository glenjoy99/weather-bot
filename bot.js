//Author Glen Joy
//Version 1.0.0

console.log("Bot started");

var Twit = require('twit');
var weather = require('weather-js');
var config = require('./config');
var T = new Twit(config);

var out;
var curr;
var skytxt;

var tweetCurrWeather = function () {
  weather.find({search: 'Gaithersburg, MD', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
    curr = result[0].current.temperature;
    skytxt = result[0].current.skytext;
    var str = "It is currently " + curr + " degrees Fahrenheit and " + skytxt + " in Gaithersburg";
    T.post('statuses/update', { status: str }, function(err, data, response) {
      console.log('Tweeted!');
    })
  });
}

var today;
var todayHigh;
var todayLow;

var tweetTodayForecast = function () {
  weather.find({search: 'Gaithersburg, MD', degreeType: 'F'}, function(err, result) {
    if(err) console.log(err);
    today = result[0].current.day;
    if (today == "Monday") {
      todayHigh = result[0].forecast[0].high;
      todayLow = result[0].forecast[0].low;
    }
    if (today == "Tuesday") {
      todayHigh = result[1].forecast[1].high;
      todayLow = result[1].forecast[1].low;
    }
    if (today == "Wednesday") {
      todayHigh = result[2].forecast[2].high;
      todayLow = result[2].forecast[2].low;
    }
    if (today == "Thursday") {
      todayHigh = result[3].forecast[3].high;
      todayLow = result[3].forecast[3].low;
    }
    if (today == "Friday") {
      todayHigh = result[4].forecast[4].high;
      todayLow = result[4].forecast[4].low;
    }
    if ((todayHigh != undefined) && (todayLow != undefined)) {
      var str = "The forecast today is a high of " + todayHigh + " and a low of " + todayLow + " degrees Fahrenheit in Gaithersburg";
    } else {
      var str = "Forecast data is currently unavailable on weekends. Enjoy your day!"
    }
    T.post('statuses/update', { status: str }, function(err, data, response) {
      console.log('Tweeted!');
    })
  });
}

setInterval(tweetCurrWeather, 10800000); //tweets every 3 hours
setInterval(tweetTodayForecast, 32400000); //tweets every 9 hours
