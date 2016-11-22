var xwing = {
    //set pilot to null
    pilot: null,
    //an anonymous funtion
    setPilot: function(pilot) {
        //this.pilot refers to the key pilot in the xwing object
        //this points to an object, but we don't know which one yet
        //pilot (on the right) is a reference to the first argument that is
        // being passed to (anonymous) function that is assigned to the setPilot
        // property
        this.pilot = pilot;
        //call update on this object
        this.update();
    },
    //update is a method that takes no arguments. It prints something to the console.
    update: function() {
        console.log('This X-Wing has changed!');
    }
};

//When I call setPilot on xwing, JavaScript looks at the xwing object to find
// the setPilot keyword.

//The CALLING CONTEXT of this line of code is xwing.
// We get a reference to a function back, then we invoke it,
// because it is followed by parens. with the params in the parentheses.

// WHEN THE FUNCTION IS CALLED, 'this' now points to xwing
// before assignment, pilot is null, after the function call,
// it is set to "Luke Skywalker".
// then the update method is called from within the setPilot function.
// this is bound to xwing, so this#update looks in the xwing object for an the
// update keyword. It finds a function and executes it using the variables in the
// parens (none in this case).
xwing.setPilot("Luke Skywalker");
// >> "This X-Wing has changed!"

console.log(xwing.pilot);
// >> "Luke Skywalker"

// Because xwing is the calling context, javascript looks for setPilot on xwing.
// It finds it, and executes it, because there are parentheses.
