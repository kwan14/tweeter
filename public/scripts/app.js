/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
  $(".new-tweet textarea").on("keyup", function (event) {
    const MAXLENGTH = 140;
    let count = charCounter($(this).val());
    if (count <= MAXLENGTH) {
      $(".new-tweet span").text(String(count));
    } else {
      let overCount = count - MAXLENGTH;
      $(this).closest(".new-tweet").find(".counter").text(("-" + overCount)).css("color", "red");
    }
  });

  var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
  ];


  function dayDifference(laterDate, earlierDate) {
    return(Math.floor((laterDate - earlierDate)/1000/60/60/24));
  }

  function createTweetElement(tweet) {
    var $article = $("<article>").addClass("tweet");
    var $header = $("<header>").appendTo($article);
    $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small).appendTo($header);
    $("<span>").addClass("user").text(tweet.user.name).appendTo($header);
    $("<span>").addClass("handle").text(tweet.user.handle).appendTo($header);
    $("<p>").text(tweet.content.text).appendTo($article);
    var $footer = $("<footer>").appendTo($article);
    $("<span>").addClass("age").text(dayDifference(Date.now(), tweet.created_at) + " days ago").appendTo($footer);
    var $tools = $("<span>").addClass("tools").appendTo($footer);
    $("<i>").addClass("fa fa-flag").appendTo($tools);
    $("<i>").addClass("fa fa-retweet").appendTo($tools);
    $("<i>").addClass("fa fa-heart").appendTo($tools);
    var $tweet = $article;
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $("#all-tweets").append(createTweetElement(tweet));
    });
  }

  renderTweets(data);




});


