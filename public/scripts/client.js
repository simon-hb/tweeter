/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//functions to prevent users from using JS on page. this will convert it to text
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//renders all tweets currently in server. used when loading page
const renderTweets = function(tweets) {
  // loops through tweets
  for (eachTweet of tweets) {
    // calls createTweetElement for each tweet
    let tempTweet = createTweetElement(eachTweet);
    //console.log(tempTweet) //testing if it showed up in console
    // takes return value and appends it to the tweets container
    $('#tweet-container').prepend(tempTweet);
  }
};

//renders lone tweet. used when submitting form.
const renderTweet = function(tweet) {
  let tempTweet = createTweetElement(tweet);
    //console.log(tempTweet) //testing if it showed up in console
    // takes return value and appends it to the tweets container
    $('#tweet-container').prepend(tempTweet);
}

const createTweetElement = function(tweet) {
  //timestamp is time in milliseconds from random date in the 70s. Date.now gives us current timestamp. If we subtract the 2 we get the difference in 2 times in ms which we can convert to days
  let createdMSDifference = Date.now() - tweet.created_at;
  let createdDayDifference = Math.ceil(createdMSDifference / (1000 * 60 * 60 * 24));

  let $singleTweet = /* HTML code for each tweet aticle */
 `<article class="tweet-element">
    <header>
      <div>
        <img src="${tweet.user.avatars}"> 
        <p>${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
      <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
      <p>${createdDayDifference} days ago</p>
      <div>
        <i class="fa fa-flag-o"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart-o"></i>
      </div>
    </footer>
  </article>`;

  return $singleTweet;
};

//function runs when page loads (document ready)
$(document).ready(function() {
  //when click Write a new Tweet, it will toggle our textbox
  $("#composeNewTweet").click(function() {
    $(".new-tweet").slideToggle("slow");
  });

  //load all our tweets upon loading page. could turn this into function and call it here but we only use it once so left it like this
  $.ajax({
    url:"/tweets",
    method: "GET"
  }).then((response) => {
    renderTweets(response);
  });

  //each time we submit form (click tweet)
  $('form').submit(function(event) {
    //cancels original functionality since we want to add our own
    event.preventDefault();
    //takes this (form) and turns it from json to jquery string (like a list)
    const serialized = $(this).serialize();
    //posts the data in /tweets. then logs tweet posted, loadTweets() again, empty textbox. else post error
    if ($('#tweet-text').val().length === 0) {
      $('#error').text("⚠️Cannot post an empty tweet.⚠️");
      $("#error").slideDown(300);
    } else if ($('#tweet-text').val().length > 140) {
      $('#error').text("⚠️Tweets must be less than 140 characters.⚠️");
      $("#error").slideDown(300);
    } else {
      //posts data to /tweets using ajax and serialized data (from above). could turn this into function and call it here but we only use it once so left it like this
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serialized
      }).then((response) => {
        //after posting we make another ajax get request to retrieve what we posted. 
        $.ajax({
          url:"/tweets",
          method: "GET"
        }).then((response) => {
          //get the latest tweet then render it. response is an array of jquery string (as seen i n /tweets) which is why we retrieve the last one using [response.length-1]
          renderTweet(response[response.length-1])
        });
        $('#error').css('display', 'none');
        $('#tweet-text').val('');
      });
    }
  });
});
