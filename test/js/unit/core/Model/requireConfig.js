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

        Model : "web/js/core/Model",
        BaseType : "web/js/utility/extend",
        IDGenerator : "test/js/stubs/IDGeneratorStub",
        ComponentContainer : "web/js/componentContainer"
    }
});





