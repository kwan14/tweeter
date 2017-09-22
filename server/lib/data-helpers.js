"use strict";


module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
        db.collection("tweeter").insertOne(newTweet);
        callback(null, true);
    },

    getTweets: function (callback) {
      db.collection("tweeter").find().toArray((err, tweets) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    }

  }
}







