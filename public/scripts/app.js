
$(function () {
  const MAXLENGTH = 140;

  $(".new-tweet textarea").on("keyup", function (event) {
    let count = charCounter($(this).val());
    if (count <= MAXLENGTH) {
      $(".new-tweet span").text(String(MAXLENGTH - count));
      $(this).closest(".new-tweet").find(".counter").css("color", "black");
    } else {
      let overCount = count - MAXLENGTH;
      $(this).closest(".new-tweet").find(".counter").text(("-" + overCount)).css("color", "red");
    }
  });

  $(".new-tweet input").on("click", function (event) {
    event.preventDefault();
    const tweetText = $(".new-tweet textarea");
    if(tweetText.val() === null || tweetText.val() === "") {
      alert("You have not entered any text.");
    } else if( tweetText.val().length > MAXLENGTH ) {
      alert("The maximum number of characters has been exceeded.");
    } else {
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: tweetText.serialize(),
        dataType: "text",
        success: function () {
          tweetText.val("");
          $(".new-tweet span").text(String(MAXLENGTH));
          refetchTweet();
        }
      })
    }
  });

  $("#nav-bar .compose").on("click", function (event) {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
    if( ($(this).css("color") === "rgb(0, 0, 0)") ) {
      $(this).css("color", "#00a087");
      $(this).css("background-color", "#e8fdff");
    } else {
      $(this).css("color", "black");
      $(this).css("background-color", "white");
    }
  });

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

  function loadTweets () {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "JSON",
      success: function (tweetDb) {
        renderTweets(tweetDb);
      }
    });
  }

  function refetchTweet () {
    $.ajax({
      url: "/tweets/",
      method: "GET",
      dataType: "JSON",
      success: function (tweetDb) {
        let mostRecent = 0;
        let index;
        for (let i = 0 ; i < tweetDb.length ; i++) {
          if( tweetDb[i].created_at > mostRecent ) {
            mostRecent = tweetDb[i].created_at;
            index = i;
          }
        }
        $("#all-tweets").prepend(createTweetElement(tweetDb[index]));
      }
    });
  }

  loadTweets();
  $(".new-tweet").slideUp();

});






















