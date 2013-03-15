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
        templateLoader : "web/js/utility/templateLoader",
        Model : "web/js/core/Model",
        ModelElement : "web/js/node/model/model.element",
        Collection : "web/js/core/Collection",
        IDGenerator : "test/js/stubs/IDGeneratorStub",
        ComponentContainer : "web/js/componentContainer"

    }
});





