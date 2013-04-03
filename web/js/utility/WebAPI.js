define(['BaseType',
        'lineContainer',
        'ModelArrowNode',
        'CollectionPointer',
        'ModelDiamond',
        'ViewPointer',
        'ViewArrowNode',
        'ControllerArrowNode',
        'ControllerDraggableElement',
        'ModelDistalNode',
        'ViewElement',
        'ModelLine',
        "ViewLine",
        "CoordinatorHorizontalConnector",
        "Collection",
        "ClassBoxModel",
        "propertyBuilder",
        "ClassBoxView",
        "ClassBoxController",
        "keyManager",
        "GuiView",
        "GuiController",
        "methodBuilder",
        "templateLoader",
        "MenuFactory",
        "MenuBarAPI",
        "PropertiesGuiAPI",
        "MethodsGuiAPI",
        "ClassAPI",
        "ArrowNodeAPI",
        "NodeAPI",
        "ConnectorAPI",
        "componentContainer",
        "VerticalConnectorAPI" ], function (BaseType,
                               HorizontalConnector,
                               ModelArrowNode,
                               CollectionPointer,
                               ModelDiamond,
                               ViewPointer,
                               ViewArrowNode,
                               ControllerArrowNode,
                               ControllerDraggableElement,
                               ModelDistalNode,
                               ViewElement,
                               ModelLine,
                               ViewLine,
                               CoordinatorHorizontalConnector,
                               Collection,
                               ClassBoxModel,
                               propertyBuilder,
                               ClassBoxView,
                               ClassBoxController,
                               KeyManager,
                               GuiView,
                               GuiController,
                               methodBuilder,
                               templateLoader,
                               MenuFactory,
                               MenuBarAPI,
                               PropertiesGuiAPI,
                               MethodsGuiAPI,
                               ClassAPI,
                               ArrowNodeAPI,
                               NodeAPI,
                               ConnectorAPI,
                               componentContainer,
                               VerticalConnectorAPI) {


    // I need to separate out the setting up of initial state of diagram with setting up the web interface.


    return BaseType.extend({


        initialize : function (config) {

            this.menuBarAPI = new MenuBarAPI({ el : $('#menu') });

        },

        numberOfConnectors : function () {

            return componentContainer.numberOfType("Connector");
        },

        numberOfVerticalConnectors : function () {
            return componentContainer.numberOfType("VerticalConnector");
        },

        numberOfUmlClasses : function () {

            return componentContainer.numberOfType("UmlClass");
        },

        getMenuBar : function () {
            return this.menuBarAPI;
        },

        getConnector : function (index) {
            return new ConnectorAPI(componentContainer.getComponent("Connector_" + index));
        },

        getVerticalConnector : function (index) {
            return new VerticalConnectorAPI(componentContainer.getComponent("VerticalConnector_" + index));
        },

        getClassBox : function (id) {
            return new ClassAPI(componentContainer.getComponent(id));
        },

        keyDown : function (key) {

            var map = { 'U' : 85 },
                keyCode;

            key = key.toUpperCase();

            keyCode = map[key];

            KeyManager._keyDown({ "keyCode" : keyCode });

        }
    });



});