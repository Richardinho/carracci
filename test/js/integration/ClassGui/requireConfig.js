/* config file for mvc classbox test*/


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
        WebAPI : "utility/WebAPI",
        horizontalConnector : "connectors/model/model.HorizontalConnector",
        ModelArrowNode : "node/model/model.ArrowNode",
        CollectionPointer : "pointers/collection/collection.Pointer",
        ModelDiamond : "pointers/model/model.Diamond",
        ViewPointer : "pointers/view/view.Pointer",
        ViewArrowNode : "node/view/view.ArrowNode",
        ControllerArrowNode : "node/controller/controller.ArrowNode",
        ModelDistalNode : "node/model/model.DistalNode",
        ViewElement : "node/view/view.element",
        ModelLine : "lines/model/model.line",
        ViewLine : "lines/view/view.line",
        CoordinatorHorizontalConnector : "connectors/coordinator.HorizontalConnector",
        ClassBoxModel : "classBox/model/model.ClassBox",
        ClassBoxView : "classBox/view/view.ClassBox",
        ClassBoxController : "classBox/controller/controller.ClassBox",
        GuiView : "gui/view.classBox",
        GuiController : "gui/controller/classBox",
        methodBuilder : "utility/methodBuilder",
        templateLoader : "utility/templateLoader",
        ModelPointer : "pointers/model/model.Pointer",
    }
});





