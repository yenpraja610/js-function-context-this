/* jshint debug: true */
// 'use strict';

// This data variable is a global variable
const data = [
    {name:'Samantha', handicap:12},
    {name:'Alexis', handicap:14}
];
console.log(data);
// user is an object literal with a data property of names and handicaps
// and a showFunction function that displays one of the name/handicap.
const user = {

    // this data variable is a property on the user object
    data    :[
        {name:'T. Woods', handicap:37},
        {name:'P. Mickelson', handicap:43}
    ],
    showData: function () {
        // random number between 0 and 1
        const randomNum = ((Math.random () * 2 | 0) + 1) - 1;

        // Hey, what is the 'this' variable pointing to?
        debugger;

        // It's the global object.
        // Why?
        // Because we change the runtime context of this function
        // when we did the assignment to a global variable below.
        // So when this function is run it's Context, and this pointer,
        // is the global object

        // This line is adding a random person from the data
        // array to the text field
        console.log (this.data[randomNum].name + ' ' + this.data[randomNum].handicap);
    }
};

// Assign the user.showData function to a global variable
const showUserData = user.showData;
// NOTE: the showUserVariable is a GLOBAL variable pointing to a
// function.


// Oh no, we changed the RUNTIME Context from the user object literal to
// the global object!!

// When we execute the showUserData function, the values printed to
// the console are from the global data array, not from the data
// array in the user object.
showUserData();

// This is another example where we do not have `use strict`
// If we had `use strict` it would still fail but differently
// Uncomment `use strict` and see the difference for yourself
