define(['BaseType',
        'componentContainer',
        'ClassBoxModel',
        'ClassBoxView',
        'ClassBoxController',
        'GuiView' ,
        'GuiController',
        'propertyBuilder',
        'methodBuilder',
        'templateLoader',
        'horizontalConnector',
        'ModelArrowNode',
        'ControllerArrowNode',
        'ViewArrowNode',
        'ModelDiamond',
        'ViewPointer',
        'CollectionPointer',
        'ModelDistalNode',
        'ViewElement',
        'ControllerDraggableElement',
        'ModelLine',
        'ViewLine',
        'CoordinatorHorizontalConnector',
        'Collection',
        'MenuFactory',
        'ClassBoxFactory',
        'componentContainer',
        'connectorFactory',
        'verticalConnectorFactory'], function (BaseType,
                                 ComponentContainer,
                                 ClassBoxModel,
                                 ClassBoxView,
                                 ClassBoxController,
                                 GuiView,
                                 GuiController,
                                 propertyBuilder,
                                 methodBuilder,
                                 templateLoader,
                                 HorizontalConnector,
                                 ModelArrowNode,
                                 ControllerArrowNode,
                                 ViewArrowNode,
                                 ModelDiamond,
                                 ViewPointer,
                                 CollectionPointer,
                                 ModelDistalNode,
                                 ViewElement,
                                 ControllerDraggableElement,
                                 ModelLine,
                                 ViewLine,
                                 CoordinatorHorizontalConnector,
                                 Collection,
                                 MenuFactory,
                                 ClassBoxFactory,
                                 ComponentContainer,
                                 connectorFactory,
                                 verticalConnectorFactory) {

    return BaseType.extend({

        initialize : function () {

            templateLoader.initialize(['umlClassBoxGUI', 'tools', 'help'], '/web/templates/');

            var menu = MenuFactory();
        },

        setUp : function (config) {

            if(config.classBoxes) {
                this.setUpClasses(config.classBoxes);
            }

            if(config.connectors) {
                this.setUpConnectors(config.connectors);
            }

            if(config.verticalConnectors) {
                this.setUpVerticalConnectors(config.verticalConnectors);
            }
        },

        setUpConnectors : function (connectorsConfig) {

            for(var i = 0; i < connectorsConfig.length; i++) {

                connectorFactory(connectorsConfig[i]);
            }
        },

        setUpClasses : function (classesConfig) {

            for(var i =0; i < classesConfig.length; i++) {

                ClassBoxFactory(classesConfig[i]);
            }
        },

        setUpVerticalConnectors : function (connectorsConfig) {

            for(var i =0; i < connectorsConfig.length; i++) {

                verticalConnectorFactory(connectorsConfig[i]);
            }
        }
    });
});