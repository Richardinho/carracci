/* Test config file */
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

        ModelElement :    "web/js/node/model/model.element",
        Collection :      "web/js/core/Collection",
        Model :           "web/js/core/Model",
        propertyBuilder : "web/js/utility/propertyBuilder",
        BaseType :        "web/js/utility/extend",
        StubTest :        "test/js/stubs/stubs",
        IDGenerator:      "test/js/stubs/IDGeneratorStub",
        methodBuilder :   "web/js/utility/methodBuilder"
    }
});





