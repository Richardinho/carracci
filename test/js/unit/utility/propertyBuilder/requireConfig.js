/* Test config file */
require.config({

    baseUrl : "../../../../../",

    shim : {

        'jQuery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        }
    },

    paths : {

        underscore : "web/js/lib/underscore",
        jQuery : "web/js/lib/jquery-1.8.0",

        propertyBuilder : "web/js/utility/propertyBuilder",
    }
});





