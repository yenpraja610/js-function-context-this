const goBoom = function (weapon) {
  console.log("this refers to ", this);
};

//creates a deathstar object
let deathstar = {
  weapon: 'Planet destroying laser'
};

//one method on js functions is #call
goBoom.call(deathstar);
// this === deathstar


// The CONTEXT (what 'this' points to) is the object that is passed in as the
// FIRST ARGUMENT to #call
// We TAKE the function goBoom, we BIND IT to deathstar,
// and then we CALL it on deathstar
