'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// load manifests
// scripts
require('./assets/scripts/index.js');

// styles
require('./assets/styles/index.scss');

// attach jQuery globally
require('expose?$!jquery');
require('expose?jQuery!jquery');

$(() => {
  let user = {
    data: [
            { name:"T. Woods", handicap:2 },
            { name:"P. Mickelson", handicap:1 },
            { name:"C. Austin", handicap:0 }
          ],
    clickHandler: function(event) {
      let randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1​
      // This line is adding a random person from the data array to the text field​
      $ ("input").val(this.data[randomNum].name + " " + this.data[randomNum].handicap);
    }
  };
  // this refers to user
  // user.clickHandler
  // this refers to the button DOM object
  // UNLESS we use .bind(), which sets this to the user object
  const racehorses = {
    data: [
      { name:"Seabiscut", handicap:2 },
      { name:"Man-o-War", handicap:1 },
      { name:"Black Beauty", handicap:0 }
    ]
  };
  $("button").on('click', user.clickHandler.bind(racehorses));

  $('.current-time').each(function() {
    setInterval(() => {
      $(this).text(Date.now());
    }, 1000);
  });
});
