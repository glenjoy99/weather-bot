//Author Glen Joy
//Version 1.0.0

console.log("Bot started");

var Twit = require('twit');
var weather = require('weather-js');

var T = new Twit({
  consumer_key:         'TQyMiBduZKDuzYok50G5FLgWA',
  consumer_secret:      'knnCJ7KyvjGJlgnb3fGuEi5wTyccbijJDhVLkZuVZf7Fax5vnv',
  access_token:         '1146897859519946753-r2eEsCO69OeF3QmtD7KCI8eG1Rby7l',
  access_token_secret:  'LBFBeNEbsfiJ5O5tztf0nlsvhibbSr4ZSVhdT9PnerbIF',
})

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

setInterval(tweetCurrWeather, 10800000); //tweets every 3 hours
