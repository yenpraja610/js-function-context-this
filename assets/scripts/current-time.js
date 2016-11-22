// finds all of the elements with the 'current-time' class
// iterates through them with .each
module.exports = {
  getCurrentTime: function() {
    $('.current-time').each(function() {
    // setInterval is a method on window
    // it takes a function and an interval, and executes that function continuously
    // each time the interval is over
      setInterval(function() {
       // the anonymous function here does not have a context for this yet
       // it sets the text of whatever context/this it gets to the current date
       $(this).text(`The current date (UTC) is: ${Date.now()}` );
       // bind is a method on js functions that sets the context
       // here, it sets the context to the context of .each,
       // elements with the current-time class
      }.bind(this), 1000);
    })
  }
}
