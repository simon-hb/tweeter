/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

//functions to prevent users from using JS on page. this will convert it to text
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (eachTweet of tweets.reverse()) {
    // calls createTweetElement for each tweet
    let tempTweet = createTweetElement(eachTweet);
    //console.log(tempTweet) //testing if it showed up in console
    // takes return value and appends it to the tweets container
    $('#tweet-container').append(tempTweet);
  }
}

const createTweetElement = function(tweet) {
let createdMSDifference = Date.now() - tweet.created_at;
let createdDayDifference = Math.ceil(createdMSDifference / (1000 * 60 * 60 * 24)); 

let $singleTweet = /* Your code for creating the tweet element */
 `<article class="tweet-element">
    <header>
      <div>
        <img src="${tweet.user.avatars}"> 
        <p>${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
      <P>${escape(tweet.content.text)}</P>
    </div>
    <footer>
      <p>${createdDayDifference} days ago</p>
      <div>
        <i class="fa fa-flag-o"></i>
        <i class="fa fa-retweet"></i>
        <i class="fa fa-heart-o"></i>
      </div>
    </footer>
  </article>`

return $singleTweet;
}

//function runs when page loads (document ready)
$(document).ready(function() {
  const loadTweets = function () {
    //gets json from /tweets
    $.ajax({
      url:"/tweets",
      method: "GET"
    }).then((response) => {
      //empty tweet container section since renderTweets appends all of the tweets in our array 
      $('#tweet-container').empty();
      renderTweets(response);
    })
  };
  //load all our tweets upon loading page
  loadTweets();
  //each time we submit form (click tweet)
  $('form').submit(function(event) {
    //cancels original functionality since we want to add our own
    event.preventDefault();
    //takes this (form) and turns it from json to jquery string (like a list)
    const serialized = $(this).serialize();
    //posts the data in /tweets. then logs tweet posted, loadTweets() again, empty textbox
    if ($('#tweet-text').val().length === 0) {
      $('#error').text("⚠️Cannot post an empty tweet.⚠️")
      $("#error").slideDown(300);
    } else if ($('#tweet-text').val().length > 140){
      $('#error').text("⚠️Tweets must be less than 140 characters.⚠️")
      $("#error").slideDown(300);
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: serialized
      }).then((response) => {
        console.log('Tweet posted')
        loadTweets();
        $('#error').css('display', 'none')
        $('#tweet-text').val('')
      });
    }
  }); 
});
