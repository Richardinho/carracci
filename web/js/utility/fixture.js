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
        'verticalConnectorFactory',
        'toolsMenuItems' ], function (BaseType,
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
                                 verticalConnectorFactory,
                                 toolsMenuItems) {

    return BaseType.extend({

        initialize : function () {

            var genericCallback = function () {
                console.log("Happy Easter.");
            }


            templateLoader.initialize(['umlClassBoxGUI', 'tools', 'help'], '/web/templates/');

            var menu = MenuFactory({
                items : [
                    {
                        name : "file",

                        subItems : [
                            {
                                name : "exportJpeg",

                                text : "export as JPEG",

                                callback : genericCallback
                            },
                            {
                                name : "exportPng",

                                text : "export as PNG",

                                callback : genericCallback
                            }
                        ]

                    },

                    {
                        name : "help",

                        subItems : [
                            {
                                name : "createClasses",

                                text : "create Uml Class",

                                callback : genericCallback
                            },
                            {
                                name : "createConnect",

                                text : "create a connector",

                                callback : genericCallback
                            },

                            {
                                name : "createConnect",

                                text : "create a connector",

                                callback : genericCallback
                            }
                        ],

                        callback : function () {
                            console.log("help!")
                        }
                    },

                    {
                        name : "tools",

                        subItems : [
                            {
                                name : "createClasses",

                                text : "uml class",

                                callback :  toolsMenuItems.createUmlClass
                            },
                            {
                                name : "horizontalConnect",

                                text : "horizontal connector",

                                callback : toolsMenuItems.createHorizontalConnector
                            },
                            {
                                name : "verticalConnect",

                                text : "vertical connector",

                                callback : toolsMenuItems.createVerticalConnector
                            }
                        ]
                    },
                ],

                itemWidth : 150,

                el : $('#menu'),

                dropDownEl : $("#drop-down-container")
            });
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