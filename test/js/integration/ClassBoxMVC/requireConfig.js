/* config file for mvc classbox test*/


require.config({

    baseUrl : "../../../../web/js",

    shim : {

        'jQuery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        },

        'jsTween' : {
            deps : ['jQuery']
        }
    },

    paths : {

        underscore : "lib/underscore",
        jsTween : "lib/jstween-1.1",
        jQuery : "lib/jquery-1.8.0",
        ModelElement : "node/model/model.element",
        Collection : "core/Collection",
        propertyBuilder : "utility/propertyBuilder",
        Model : "core/Model",
        svgUtilities : "utility/svgUtilities",
        svg : "utility/svg",
        ControllerDraggableElement : "node/controller/controller.draggableElement",
        keyManager : "node/controller/controller.KeyManager",
        globalController : "globalController/controller.Global",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        BaseType : "utility/extend",
        ModelClassBox : "classBox/model/model.ClassBox",
        IDGenerator : "utility/IDGenerator",
        NodeToBoxCoordinator : "global/controllers/controller.AttachedNodeToBox",
        BaseCoordinator : "coordinators/baseCoordinator",
        ArrowCoordinator: "coordinators/ArrowCoordinator",
        BoxCoordinator: "coordinators/BoxCoordinator",
        ProximalNodeCoordinator:"coordinators/ProximalNodeCoordinator",
        DistalNodeCoordinator: "coordinators/DistalNodeCoordinator",
        methodBuilder : "utility/methodBuilder",
        VerticalNodeBoxCoordinator : "global/controllers/verticalNodeToBox",
        ArrowVCoordinator : "coordinators/verticalConnectorsToBox/ArrowCoordinator",
        BoxVCoordinator : "coordinators/verticalConnectorsToBox/boxCoordinator",
        ProximalNodeVCoordinator : "coordinators/verticalConnectorsToBox/proximalNodeCoordinator",
        DistalNodeVCoordinator : "coordinators/verticalConnectorsToBox/distalNodeCoordinator",
        MenuElementModel : "menu/models/menuElementModel",
        MenuElementView : "menu/views/menuElementView",
        MenuElementController : "menu/controller/menuElementController",
        toolsMenuItems : "menu/toolsMenuItems"





    }
});





