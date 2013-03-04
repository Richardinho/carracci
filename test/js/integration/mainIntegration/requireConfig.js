/* config file for node to box link test*/


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

        jQuery : "lib/jquery-1.8.0",
        underscore : "lib/underscore",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        keyManager : "node/controller/controller.KeyManager",
        globalController : "globalController/controller.Global",
        svgUtilities : "utility/svgUtilities",
        connectorFactory : "connectors/factory/factory.connector",
        horizontalConnector : "connectors/model/model.HorizontalConnector",
        Model : "core/Model",
        ModelElement : "node/model/model.element",
        Collection : "core/Collection",
        ModelDiamond : "pointers/model/model.Diamond",
        ModelPointer : "pointers/model/model.Pointer",
        ViewPointer : "pointers/view/view.Pointer",
        CollectionPointer : "pointers/collection/collection.Pointer",
        ModelArrowNode : "node/model/model.ArrowNode",
        ViewElement : "node/view/view.element",
        ViewArrowNode : "node/view/view.ArrowNode",
        ControllerArrowNode : "node/controller/controller.ArrowNode",
        ControllerDraggableElement : "node/controller/controller.draggableElement",
        ModelDistalNode : "node/model/model.DistalNode",
        ModelLine : "lines/model/model.line",
        ViewLine : "lines/view/view.line",
        CoordinatorHorizontalConnector : "connectors/coordinator.HorizontalConnector",
        GuiView : "gui/view.classBox",
        GuiController : "gui/controller/classBox",
        GuiPropertyView : "gui/views/property",
        GuiPropertyController : "gui/controller/property",
        ClassBoxModel : "classBox/model/model.ClassBox",
        ClassBoxView : "classBox/view/view.ClassBox",
        ClassBoxController : "classBox/controller/controller.ClassBox",
        MenuFactory : "menu/factory",
        MenuModel : "menu/model",
        MenuView : "menu/view",
        HelpModel : "menu/help/model",
        HelpController : "menu/help/controller",
        helpData : "menu/help/data",
        HelpView : "menu/help/view",
        foo : "menu/controller",
        propertyBuilder : "utility/propertyBuilder",
        PropertyModel : "classBox/model/property",
        TypeSpecificCollection : "core/TypeSpecificCollection",
        ClassBoxFactory : "classBox/factory/factory.ClassBox",
        ToolsModel : "menu/tools/model",
        ToolsView : "menu/tools/view",
        ToolsController : "menu/tools/controller",
        BaseType : "utility/extend",
        NodeToBoxCoordinator : "global/controllers/controller.AttachedNodeToBox",
        templateLoader : "utility/templateLoader"

    }
});





