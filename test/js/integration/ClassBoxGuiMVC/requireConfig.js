/* Test config file */
require.config({

    baseUrl : "../../../../web/js",

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
        jQuery : "lib/jquery-1.8.0",
        ModelElement : "node/model/model.element",
        Collection : "core/Collection",
        propertyBuilder : "utility/propertyBuilder",
        Model : "core/Model",
        svgUtilities : "utility/svgUtilities",
        svg : "utility/svg",
        ControllerDraggableElement : "node/controller/controller.draggableElement",
        keyManager : "node/controller/controller.keyManager",
        globalController : "globalController/controller.Global",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        BaseType : "utility/extend",
        ModelClassBox : "classBox/model/model.ClassBox",
        ViewClassBox : "gui/view.classBox"
    }
});





