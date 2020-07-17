console.log("bot is starting");

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);
var final_tweet;
var str="#";
var request = require("request");

var options = {
    method: 'GET',
    url: 'https://quotes15.p.rapidapi.com/quotes/random/',
    qs: { language_code: 'en' },
    headers: {
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        'x-rapidapi-key': 'get-your-own-key',
        useQueryString: true
    }
};




setInterval(tweetIt, 1000 * 60 * 60 * 4 );//for scheduling tweets 1000ms=1s 1 tweet every 4 hours

function tweetIt() {
    var request = require("request");

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var result=JSON.parse(body);
        var no_of_hashtags=result.tags.length;
        for(var i=0;i<no_of_hashtags;i++){
            str+=result.tags[i].toLowerCase()+" #";
        }
        str+='inspiring';
        if(result.content=='undefined'){
            final_tweet="Have a good Day ! ";           
        }
        else{
            final_tweet=result.content+" ~"+result.originator.name;
        }

    });

    var tweet = {
        status:  final_tweet +'\n'+ '#'+str
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("err wrong happened");
        }
        else {
            console.log("worked");
            str="";
        }
    };
}


