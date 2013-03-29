/* Config file for WebAPI test  */
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
        WebAPI : "web/js/utility/WebAPI",
        horizontalConnector : "web/js/connectors/model/model.HorizontalConnector",
        ModelArrowNode : "web/js/node/model/model.ArrowNode",
        Model : "web/js/core/Model",
        ModelElement : "web/js/node/model/model.element",
        Collection : "web/js/core/Collection",
        CollectionPointer : "web/js/pointers/collection/collection.Pointer",
        ModelDiamond : "web/js/pointers/model/model.Diamond",
        ModelPointer : "web/js/pointers/model/model.Pointer",
        ViewPointer : "web/js/pointers/view/view.Pointer",
        raphael : "web/js/lib/raphael.2.1.0.amd",
        raphaelCore : "web/js/lib/raphael.2.1.0.core",
        svg : "web/js/utility/svg",
        raphaelSVG : "web/js/lib/raphael.2.1.0.svg",
        raphaelVML : "web/js/lib/raphael.2.1.0.vml",
        eve : "web/js/lib/eve.0.3.4",
        svgUtilities : "web/js/utility/svgUtilities",
        ViewArrowNode : "web/js/node/view/view.ArrowNode",
        ControllerArrowNode : "web/js/node/controller/controller.ArrowNode",
        ViewElement : "web/js/node/view/view.element",
        ControllerDraggableElement : "web/js/node/controller/controller.draggableElement",
        keyManager : "web/js/node/controller/controller.KeyManager",
        globalController : "web/js/globalController/controller.Global",
        NodeToBoxCoordinator : "web/js/global/controllers/controller.AttachedNodeToBox",
        ModelDistalNode : "web/js/node/model/model.DistalNode",
        ViewElement : "web/js/node/view/view.element",
        ModelLine : "web/js/lines/model/model.line",
        ViewLine : "web/js/lines/view/view.line",
        CoordinatorHorizontalConnector : "web/js/connectors/coordinator.HorizontalConnector",
        ClassBoxModel : "web/js/classBox/model/model.ClassBox",
        propertyBuilder : "web/js/utility/propertyBuilder",
        ClassBoxView : "web/js/classBox/view/view.ClassBox",
        ClassBoxController : "web/js/classBox/controller/controller.ClassBox",
        IDGenerator: "web/js/utility/IDGenerator",
        ArrowCoordinator: "web/js/coordinators/ArrowCoordinator",
        BaseCoordinator: "web/js/coordinators/baseCoordinator",
        ProximalNodeCoordinator: "web/js/coordinators/ProximalNodeCoordinator",
        DistalNodeCoordinator: "web/js/coordinators/DistalNodeCoordinator",
        BoxCoordinator: "web/js/coordinators/BoxCoordinator",
        GuiView : "web/js/gui/view.classBox",
        GuiController : "web/js/gui/controller/classBox",
        methodBuilder : "web/js/utility/methodBuilder",
        MenuFactory : "web/js/menu/factory",
        MenuModel : "web/js/menu/model",
        MenuView : "web/js/menu/view",
        HelpModel : "web/js/menu/help/model",
        HelpController : "web/js/menu/help/controller",
        helpData : "web/js/menu/help/data",
        HelpView : "web/js/menu/help/view",
        foo : "web/js/menu/controller",
        ToolsModel : "web/js/menu/tools/model",
        ToolsView : "web/js/menu/tools/view",
        ToolsController : "web/js/menu/tools/controller",
        ClassBoxFactory : "web/js/classBox/factory/factory.ClassBox",
        MenuBarAPI : "test/webAPI/menuBar",
        ToolsDropDownAPI : "test/webAPI/toolsDropDown",
        PropertiesGuiAPI : "test/webAPI/propertiesGuiAPI",
        MethodsGuiAPI: "test/webAPI/methodsGuiAPI",
        ClassGuiAPI : "test/webAPI/classGuiAPI",
        ClassAPI : "test/webAPI/classAPI",
        ArrowNodeAPI : "test/webAPI/arrowNodeAPI",
        NodeAPI : "test/webAPI/nodeAPI",
        ConnectorAPI : "test/webAPI/connectorAPI",
        componentContainer : "web/js/componentContainer",
        Fixture : "web/js/utility/fixture",
        connectorFactory : "web/js/connectors/factory/factory.connector",
        ClassGuiAPI : "test/webAPI/classGuiAPI",
        verticalConnectorFactory : "web/js/connectors/factory/verticalConnector",
        VerticalConnectorAPI : "test/webAPI/verticalConnectorAPI",
        CoordinatorVerticalConnector : "web/js/connectors/coordinator.VerticalConnector",
        VerticalNodeBoxCoordinator : "web/js/global/controllers/verticalNodeToBox",
        ArrowVCoordinator : "web/js/coordinators/verticalConnectorsToBox/ArrowCoordinator",
        BoxVCoordinator : "web/js/coordinators/verticalConnectorsToBox/boxCoordinator",
        ProximalNodeVCoordinator : "web/js/coordinators/verticalConnectorsToBox/proximalNodeCoordinator",
        DistalNodeVCoordinator : "web/js/coordinators/verticalConnectorsToBox/distalNodeCoordinator",
        ArgAPI : "test/webAPI/argAPI"
    }
});





