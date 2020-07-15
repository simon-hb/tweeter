/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (eachTweet of tweets) {
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
      <P>${tweet.content.text}</P>
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

$(document).ready(function() {
  renderTweets(data);
})


// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right 