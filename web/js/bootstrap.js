

require.config({

    shim : {

        'jQuery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        },

        'jsTween' : {
            deps : ['jQuery']
        },

        'canvg' : {

            deps : ['rgbColor'],

            exports : 'canvg'
        }


    },
    paths : {
        deletePopUp : "connectors/deletePopUp",
        DeletePopUpController : "connectors/DeletePopUpController",
        DeletePopUpView : "connectors/DeletePopUpView",
        jQuery : "lib/jquery-1.8.0",
        jsTween : "lib/jstween-1.1",
        underscore : "lib/underscore",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        Model : "core/Model",
        Collection : "core/Collection",
        ModelElement : "core/ModelElement",
        keyManager : "node/controller/controller.KeyManager",
        globalController : "globalController/controller.Global",
        svgUtilities : "utility/svgUtilities",
        ConnectorFactory : "connectors/factory/ConnectorFactory",
        horizontalConnectorFactory : "connectors/factory/horizontalConnector",
        verticalConnectorFactory : "connectors/factory/verticalConnector",
        lineContainer : "connectors/lineContainer",
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
        HorizontalConnectorMediator : "connectors/horizontalConnectorMediator",
        GuiView : "gui/view.classBox",
        GuiController : "gui/classBoxController",
        GuiPropertyView : "gui/views/property",
        GuiPropertyController : "gui/controller/property",
        ClassBoxModel : "classBox/model/model.ClassBox",
        ClassBoxView : "classBox/view/view.ClassBox",
        ClassBoxController : "classBox/controller/controller.ClassBox",
        propertyBuilder : "utility/propertyBuilder",
        methodBuilder : "utility/methodBuilder",
        PropertyModel : "classBox/model/property",
        ClassBoxFactory : "classBox/factory/factory.ClassBox",
        BaseType : "utility/extend",
        NodeToBoxCoordinator : "global/controllers/controller.AttachedNodeToBox",
        VerticalNodeBoxCoordinator : "global/controllers/verticalNodeToBox",
        templateLoader : "utility/templateLoader",
        IDGenerator : "utility/IDGenerator",
        BaseCoordinator : "coordinators/baseCoordinator",
        ArrowCoordinator: "coordinators/ArrowCoordinator",
        BoxCoordinator: "coordinators/BoxCoordinator",
        ProximalNodeCoordinator:"coordinators/ProximalNodeCoordinator",
        DistalNodeCoordinator: "coordinators/DistalNodeCoordinator",
        ApplicationFactory : "utility/applicationFactory",
        componentContainer : "componentContainer",
        VerticalConnectorMediator : "connectors/verticalConnectorMediator",
        ArrowVCoordinator : "coordinators/verticalConnectorsToBox/ArrowCoordinator",
        BoxVCoordinator : "coordinators/verticalConnectorsToBox/boxCoordinator",
        ProximalNodeVCoordinator : "coordinators/verticalConnectorsToBox/proximalNodeCoordinator",
        DistalNodeVCoordinator : "coordinators/verticalConnectorsToBox/distalNodeCoordinator",
        MenuElementModel : "menu/models/menuElementModel",
        MenuElementView : "menu/views/menuElementView",
        MenuElementController : "menu/controller/menuElementController",
        toolsMenuItems : "menu/toolsMenuItems",
        MenuFactory : "menu/factory",
        ModelImplements : "pointers/model/model.Implements",
        ToolBoxFactory : "toolbox/toolboxFactory",
        ToolBoxModel : "toolbox/toolboxModel",
        ToolBoxView : "toolbox/toolboxView",
        ToolBoxController : "toolbox/toolboxController",
        canvg : "lib/canvg-1.2/canvg",
        rgbColor : "lib/canvg-1.2/rgbcolor",


    }
});


require(['ApplicationFactory'], function (ApplicationFactory) {

    $(document).ready(function () {

        configuration = {

            horizontalConnectors : [ { id : "foo",
                leftNode : { x  : 25, y : 10 , arrows : ['diamond', 'implements', 'none'] },
                rightNode : { x  : 225, y : 110 , arrows : ['diamond', 'implements', 'none'] } }
            ],
            classBoxes : [{

                name : "List",

                id : "blahClass",

                x : 0,

                y : 0,

                properties :  [
                    { name : "foo", visibility : "+", type : "String" },
                    { name : "bar", visibility : "#", type : "int" }
                    ],

                methods : [
                    {  name : "doThat",  visibility : "+", returnType : "String" }
                    ]
            }]
        };

        new ApplicationFactory().setUp(configuration);

    });
});





