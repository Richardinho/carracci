define(['BaseType',
        'horizontalConnector',
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
        "ClassGuiAPI",
        "ClassAPI",
        "ArrowNodeAPI",
        "NodeAPI",
        "ConnectorAPI",
        "componentContainer" ], function (BaseType,
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
                               ClassGuiAPI,
                               ClassAPI,
                               ArrowNodeAPI,
                               NodeAPI,
                               ConnectorAPI,
                               componentContainer) {


    // I need to separate out the setting up of initial state of diagram with setting up the web interface.


    return BaseType.extend({


        initialize : function (config) {


        },

        numberOfConnectors : function () {
            if(componentContainer['Connector']){
                return componentContainer['Connector'].length;
            } else {
                return 0;
            }
        },

        numberOfUmlClasses : function () {
            if(componentContainer['UmlClass']){
                return componentContainer['UmlClass'].length;
            } else {
                return 0;
            }
        },

        getMenuBar : function () {
            return menuBarAPI;
        },

        getConnector : function (id) {
            return this.connectors[id];
        },

        getClassBox : function (id) {
            return this.classesAPI[id];
        },

        getClassBoxGui : function (id) {
            return this.classGuisAPI[id];
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