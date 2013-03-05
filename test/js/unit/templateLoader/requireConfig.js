/* Config file for Node to Box Coordinator test  */
require.config({

    baseUrl : "../../../../",

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
        BaseType : "web/js/utility/extend",
        templateLoader : "web/js/utility/templateLoader"

    }
});




