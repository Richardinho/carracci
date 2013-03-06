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
        NodeToBoxCoordinator : "web/js/global/controllers/controller.AttachedNodeToBox",
        underscore : "web/js/lib/underscore",
        IDGenerator : "test/js/stubs/IDGeneratorStub"

    }
});





