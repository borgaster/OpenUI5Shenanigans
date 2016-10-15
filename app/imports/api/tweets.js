import { Mongo } from "meteor/mongo";

// Create a Mongo collection to store our tasks
export const tasks = new Mongo.Collection("Tweets");
if (Meteor.isServer) {
    Meteor.publish("Tweets", function tasksPublication() {
        console.log("publish");
        return tasks.find({}, { sort: { createdAt: -1 } });
    });
    startScan();
}

function startScan() {
    let Fiber = new Npm.require('fibers');
    console.log("Started scan");

    Twitter = Npm.require('twitter');
    let client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    let connector = Mongo.Collection.get("Tweets");

    // You can also get the stream in a callback if you prefer. 
    client.stream('statuses/filter', { track: '#SAP' }, function(stream) {
        stream.on('data', function(event) {
            let tweet = {
                Author: event.user.screen_name,
                AuthorPicUrl: event.user.profile_image_url,
                createdAt: new Date(event.created_at),
                Text: event.text,
                timeStamp: event.timestamp_ms
            };
            console.log(tweet);
            Fiber(function() {
                tasks.insert(tweet);
            }).run();


        });

        stream.on('error', function(error) {
            throw error;
        });
    });


}

Meteor.methods({
    //Add methods here
});