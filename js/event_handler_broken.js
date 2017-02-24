/* jshint debug: true */
'use strict';

const user = {
    data:[
        {name:'T. Woods', handicap:37},
        {name:'P. Mickelson', handicap:43}
    ],
    clickHandler:function () {
        // random number between 0 and 1
        let randomNum = ((Math.random () * 2 | 0) + 1) - 1,
        randomName,
        randomHandicap;

        // Hey, what is the 'this' variable pointing to?
        debugger;

        // Oops, the this pointer is the button DOM element.
        // Why?
        // Because this callback function was invoked as
        // an event handler for the button element's click event!

        // And the button element does NOT have a property named data
        // so, we barf here.

        // Oh, barfing by way of throwing this exception.
        // Uncaught TypeError: Cannot read property '1' of undefined

        // What is undefined?
        // the data property of this is undefined.

        // what is property '1' of undefined?
        // data[1] is property '1' of undefined.
        randomName = this.data[randomNum].name;
        randomHandicap = this.data[randomNum].handicap;

        // This line is printing a random person's name and handicap from
        // the data array
        console.log( randomName + ' ' + randomHandicap);
    }
};

$('button').on('click', user.clickHandler);
