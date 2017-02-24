/* jshint debug: true */
'use strict';
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
    showData:function () {
        // random number between 0 and 1
        const randomNum = ((Math.random () * 2 | 0) + 1) - 1;

        // Hey, what is the 'this' variable pointing to?
        debugger;

        // It's the user object literal.
        // Why?
        // Because we changed the runtime context of the
        // this function EXPLICITLY using the javascript 'bind'
        // function/method.

        // This line is adding a random person from the data
        // array to the text field
        console.log (this.data[randomNum].name + ' ' + this.data[randomNum].handicap);
    }
};

// Assign the user.showData function to a global variable
const showUserData = user.showData.bind(user);
// NOTE: the showUserVariable is a GLOBAL variable pointing to a
// function.
// But we used the javacript 'bind' method to explicitly set the
// Context, and the this pointer, to be the user object literal.

// When we execute the showUserData function, the values printed to
// the console are from data array in the user object.
showUserData();
