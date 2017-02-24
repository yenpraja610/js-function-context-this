/* jshint debug: true */
'use strict';

const user = {
    tournament:'The Masters',
    data      :[
        {name:'T. Woods', handicap:37},
        {name:'P. Mickelson', handicap:43}
    ],

    showPersonTournament:function () {
        // Hey, what is the 'this' variable pointing to?
        debugger;

        // Yep, the this pointer is pointing to the user
        // object literal we created above.

        // the use of this.data here is fine, because 'this'
        // refers to the user object, and data is a property on
        // the user object.

        this.data.forEach (function (person) {
            // Hey, what is the 'this' variable pointing to?
            debugger;

            // It's pointing to the global object, aka window.
            // WTF!! How'd that happen.
            // Javascript wierdness thats how, very troubling, a bad part.

            // But here inside the anonymous function
            // (that we pass to the forEach method), 'this' no
            // longer refers to the user object.
            // This inner function cannot access the outer function's 'this'
            console.log ('What is This referring to? ' + this);
            // undefined

            debugger;
            // Check this and person variables.

            // Waaaa. We barfo at the next statement.
            // this.tournament will make this barfo.
            // Why?
            // Because I said so, oh sorry. Because the global
            // object has no flipping tournament property. Right?
            console.log (person.name + ' is playing at ' + this.tournament);
            // Uncaught TypeError: Cannot read property 'tournament' of undefined
        });
    }
};

// Invoke the user object literal's showPersonTournament function.
// Note: it's really not being used as a event handler here.
user.showPersonTournament();
