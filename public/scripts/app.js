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

});

