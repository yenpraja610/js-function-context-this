[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# JavaScript: Context \& `this`

![What is this?](http://i.giphy.com/bYGMDZP58u5bi.gif)

## Objectives

By the end of this lesson, students should be able to:

-   Recall whether or not `this` is determined at declaration.
-   Explain what `this` points to in each calling context.
-   Read and follow the execution context of code that uses different `this`
idioms.

## Preparation

1.  [Fork and clone](https://github.com/ga-wdi-boston/meta/wiki/ForkAndClone)
this repository.

## `this` Is A Reference

> We use this similar to the way we use pronouns in natural languages like
>English and French. We write: “John is running fast because he is trying to
>catch the train.” Note the use of the pronoun “he.” We could have written this:
>“John is running fast because John is trying to catch the train.” We don’t
>reuse “John” in this manner, for if we do, our family, friends, and colleagues
>would abandon us. Yes, they would. In a similar aesthetic manner, we use the
>this keyword as a shortcut, a referent to refer to an object.
>
> Source: [Understanding Javascript 'this' pointer.](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)

## `this` Changes by Call Context

A function can indiscriminately operate upon *any* object. When a function is
invoked, it is *bound* to an object on which it operates. The *contextual*
object on which a function operates is referenced using the keyword `this`.

```js
let xwing = {
    pilot: null,

    setPilot: function(pilot) {
        this.pilot = pilot;
        this.update();
    },

    update: function() {
        console.log('This X-Wing has changed!');
    }
};

xwing.setPilot("Luke Skywalker");
// >> "This X-Wing has changed!"

console.log(xwing.pilot);
// >> "Luke Skywalker"
```

## The Four Patterns of Invocation

We must *invoke* a function to run it (ie: call upon the function to do its
thing). Amazingly, there are FOUR ways to invoke a function in JavaScript. This
makes JS both amazingly flexible and absolutely insane.

### Function Invocation Pattern

When a function is invoked without context, the function is bound to global
scope:

```js
const goBoom = function(){
  console.log(this);
};

goBoom();
// this === window

// This is the same as:
window.goBoom();
```

**Context**: `this` refers to the `window` object (global scope).  Here we
would say "a method is called on an object".  In this case the object is the
`window`.

**Gotcha**: This behavior has changed in ECMAScript 5 only when using strict
mode: `'use strict';`

### Method Invocation Pattern

When a function is defined on an object, it is said to be a *method* of the
object. When a method is invoked through its host object, the method is bound
to its host:

```js
let deathstar = {
    goBoom: function() {
      console.log(this);
  };
};

deathstar.goBoom();
// this === deathstar
```

**Context**: `this` refers to the host object.

### Call/Apply Invocation Pattern

Function objects have their own set of native methods, most notably are
`.call` and `.apply`. These methods will invoke the function with a provided
contextual object.

```js
function goBoom(weapon) {
  console.log("this refers to ", this);
};

let deathstar = {
  weapon: 'Planet destroying laser'
};

goBoom.call(deathstar);
// this === deathstar
```

**Context**: `this` refers to the passed object.  Here you would say "the
 object receives the method".

### Constructor Invocation Pattern

Any function may act as a constructor for new object instances. New object
instances may be constructed with the `"new"` keyword while invoking a
function.

Constructors are very similar to Ruby class constructors, in that they
represent proper nouns within our application. Therefore they should follow
the convention of capitalized names:

```js
const Deathstar = function (weapon) {
  console.log("this is ", this);
  this.emporer = "Darth Sidius";
  this.weapon = weapon;
  this.whatIsThis = function(){
    console.log("Inside whatIsThis, this is ", this);
  };
  console.log("this is ", this);
};

let thatsNoMoon = new Deathstar('Mega giant huge laser');
let thatsNoMoon = new Deathstar('Happy little Ewoks');
// this === shiny new Deathstar instance
```

**Context**: `this` refers to the newly-created object instance.  Here we
would say "the object receives the method".

How this breaks down:

1.  Creates a new empty object ({}) // {}
1.  Attaches the constructor to the object as a property // {}.constructor = Deathstar
1.  Invokes the constructor function on the new object // {}.constructor(`???`);
1.  Returns the object // {}

## This and Array Methods

```javascript
let Counter = function() {
  this.sum = 0;
  this.count = 0;
};

const sumAndCount = function(entry){
  this.sum += entry;
  ++this.count;
  console.log(this);
};

Counter.prototype.add = function(array) {
  array.forEach(sumAndCount, this);
                          // ^---- Note
};

let obj = new Counter();
obj.add([2, 5, 9]);
obj.count
// 3
obj.sum
// 16
```
What if we re-defined `add` the following way?
```js
let anyObject = {};

Counter.prototype.add = function(array) {
  array.forEach(sumAndCount, anyObject);
                          // ^---- Note
};
```

Since obj.add() calls add() with `this` referring to obj, in add passing `this`
into forEach() makes `this` in the forEach() callback also refer to obj.

[forEach - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## Binding

Consider the following code:

```javascript
//            <button>Get Random Person</button>​
​//        <input type="text">​
​
​
let user = {
  data: [
          { name:"T. Woods", handicap:2 },
          { name:"P. Mickelson", handicap:1 },
          { name:"C. Austin", handicap:0 }
        ],
  clickHandler: function(event){
    let randomNum = ((Math.random() * 2 | 0) + 1) - 1; // random number between 0 and 1​
    // This line is adding a random person from the data array to the text field​
    $ ("input").val(this.data[randomNum].name + " " + this.data[randomNum].age);
  }
}
​
​// Assign an eventHandler to the button's click event​
$ ("button").on('click', user.clickHandler);
```

What is happening and will this work?

With the `.bind()` method we can bind the context of user.clickHandler to the
user object like so:

```javascript
$ ("button").on('click', user.clickHandler.bind(user));
```

## Summary

1.  Is the function called with `new` (**new binding**)? If so, `this` is the
newly constructed object.      `let bar = new foo()`
1.  Is the function called with `call` or `apply` (**explicit binding**), even
hidden inside a `bind` *hard binding*? If so, `this` is the explicitly
specified object.
     `let bar = foo.call( obj2 )`
1.  Is the function called with a context (**implicit binding**), otherwise
known as an owning or containing object? If so, `this` is *that* context
object.
     `let bar = obj1.foo()`
1.  Otherwise, default the `this` (**default binding**). If in `strict mode`,
pick `undefined`, otherwise pick the `global` object.
     `let bar = foo()`

 Source: [You-Dont-Know-JS/ch2.md](https://github.com/getify/You-Dont-Know-JS/blob/58dbf4f867be0d9c51dfc341765e4e4211608aa1/this%20&%20object%20prototypes/ch2.md)

## Extra: Fat Arrow (New in ES6)

Consider the following code, what is `this`?

```javascript
$('.current-time').each(function() {
  setInterval(function() {
    $(this).text(Date.now());
  }, 1000);
});
```

The above code won't return do what you want, can you think of a
way to get the code to do what is expcted?

```bash
Figure this out on your own.
```

Now with arrow functions (commonly referred to as "fat arrow"), you
could write the code below and it would have the intended effect:

```javascript
$('.current-time').each(function() {
  setInterval(() => $(this).text(Date.now()), 1000);
});
```

Fat arrow quick takes:

1.  It does not create it's own `this` context.
1.  A one line fat arrow function has an implicit return.

## Lab (Pair)

Pair with a partner and follow the instructions in [`this.html`](this.html).
Your goal in this assignment is to read and understand the code examples
presented. Take time to contemplate the execution flow, and note any questions
you have for discussion.

Many of these scripts use the special `debugger` keyword to stop JS execution
and open your console. Use this opportunity to inspect your environment (perhaps
by looking at `this`?) and then
[continue](https://developer.chrome.com/devtools/docs/javascript-debugging).
When you're ready to begin, open the console and type `open this.html` and
follow the instructions on the screen.

## Additional Resources

-   [Functions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
-   [Everything you wanted to know about JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
-   [Understand JavaScript’s “this” With Clarity, and Master It | JavaScript is Sexy](http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/)
-   [You-Dont-Know-JS/README.md at master · getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes)
-   [this - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
-   [Fat Arrow - Strongloop](https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/)

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
