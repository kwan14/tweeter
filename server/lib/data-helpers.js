"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb 2ND TIME: ${MONGODB_URI}`);



        database.collection("tweeter").insertOne(newTweet);
        callback(null, true);



 database.close();
});


    },

    // Get all tweets in `db`, sorted by newest first



    getTweets: function (callback) {

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, database) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb 2ND TIME: ${MONGODB_URI}`);



      database.collection("tweeter").find().toArray((err, tweets) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });



  database.close();
});




    }

  }
}







