/* Test config file */
require.config({

    baseUrl : "../../../../../web/js",

    shim : {

        'jQuery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        }
    },

    paths : {

        underscore : "lib/underscore",
        jQuery : "lib/jquery-1.8.0"

    }
});

