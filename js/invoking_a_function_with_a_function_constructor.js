// Invoking a Function with a Function Constructor

//If a function invocation is preceded with the new keyword, it is a constructor invocation.
//It looks like you create a new function, but since JavaScript functions are objects you actually create a new object:

// This is a function constructor:
function Person(firstName, lastName) {
  console.log("this(in Person):", this);
  this.firstName = firstName;
  this.lastName  = lastName;
}

// This	creates a new object
const ada = new Person("Ada","Lovelace");
console.log(ada.firstName);
console.log(typeof ada);
console.log(typeof Person);

// Note the difference between this and...
// const ada = {
//   firstName: "Ada",
//   lastName: "Lovelace"
// }
// ada.firstName;

// This is reusable...
// const grace = new Person("Grace", "Hopper");
// grace.firstName;
