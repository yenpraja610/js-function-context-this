// Invoking a Function with a Function Method

// In JavaScript, functions are objects.
// JavaScript functions have properties and methods.

// call() and apply() are predefined JavaScript function methods.
// Both methods can be used to invoke a function,
//  and both methods must have the owner object as first parameter.

const sally_ride = {
  name: "Sally Ride"
}

const astronaut_steve = {
  name: "Steve Swanson"
}


function hello(thing) {
  console.log("this(in hello):", this);
  console.log("Hello " + thing + " -- " + this.name);
}

// this:
hello.call(sally_ride, "Shuttle!");

// hello.call(astronaut_steve, "ISS!");
