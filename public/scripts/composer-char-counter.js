$(document).ready(function() {
  // --- our code goes here ---
  const lengthCounter = function() {
    //this is the textarea. sibling is div. children are button and output(counter). output is last child
    $(this).siblings().children().last().text(140 - this.value.length);
    if (this.value.length > 140) {
      $(this).siblings().children().last().css('color','red');
    } else {
      $(this).siblings().children().last().css('color','black');
    }
  };
  $("#tweet-text").on('keyup', lengthCounter);
});