
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('spotify-web-api-node');
var request = require('request');
var keys = require('./keys.js');

var argument2 = process.argv[2];
var argument3 = process.argv[3];

function switchFunction() {
    switch (argument2) {
        case "my-tweets":
            twitter();
            break;
        case "spotify-this-song":
            spotify();
            break;
        // case "movie-this":
        //     movie();
        //     break;
        // case "do-what-it-says":
        //     itSays();
        //     break;
        default:
            console.log('invalid entry');
    }
}

//https://dev.twitter.com/overview/api/tweets
function twitter(){
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret:  keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    //twitter function parameters:
    var parameters = {
        twitterHandle: 'bentleybrent',
        count: 20
    };
    //get statuses from twitter
    client.get("statuses/user_timeline", parameters, function(error, tweets, response){
        if (!error && response.statusCode == 200) {
            for(var i = 0; i < tweets.length; i++){
                console.log(tweets[i].text + "Created on:" + tweets[i].created_at + "\n");
            }
            console.log("--end result--" + "\n");
        } else {
            console.log(error);
        }

    });
}

//https://developer.spotify.com/web-api/object-model/
function spotify() {
    console.log(argument3);
    var spotifyApi = new Spotify({            
        clientID: keys.spotifyKeys.client_id,
        clientSecret: keys.spotifyKeys.client_secret
    });

    console.log(spotifyApi);

    spotifyApi.searchTracks(argument3, {limit: 1}).then(function (data) {
            var tracks = data.body.tracks.items;
            console.log("-------START-------");
            for (var i in tracks) {
                console.log("-------------");
                console.log("Artist: " + tracks[i].artists[0].name);
                console.log("Song: " + tracks[i].name);
                console.log("Preview: " + tracks[i].preview_url);
                console.log("Album: " + tracks[i].album.name);
            }
        console.log("--end result--" + "\n");
    });
}


//call switch function
switchFunction();