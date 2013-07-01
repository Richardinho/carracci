

require.config({

    shim : {

        'jquery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        }

    },

    paths : {
    /* points to lib folder within version2 */
        jquery : "lib/jquery-1.8.0",
        underscore : "lib/underscore"


    }
});


require(['jquery', 'utility/eventNode'],

         function ($, EventNode) {

    $(document).ready(function () {


        var foo = new EventNode({

            bar : {

                dan1 : "dan1",
                dan2 : "dan2",

                eco : {

                    goat : {

                        hat1 : "hat1",
                        hat2 : "hat2"
                    }
                }
            }
        });

        var childNode = foo.children['bar']
                    .children['eco']
                    .children['goat']
                    .children['hat1'];

        childNode.on("anEvent", function (arg) {
            debugger;
            eventArg = arg;
        });

        foo.broadcast("anEvent", "foo");



    });
});





