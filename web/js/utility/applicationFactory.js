define(['BaseType',
        'templateLoader',
        'MenuFactory',
        'toolsMenuItems',
        'horizontalConnectorFactory',
        'verticalConnectorFactory',
        'ClassBoxFactory' ], function ( BaseType,
                                        templateLoader,
                                        MenuFactory,
                                        toolsMenuItems,
                                        horizontalConnectorFactory,
                                        verticalConnectorFactory,
                                        ClassBoxFactory ) {

    return BaseType.extend({

        initialize : function () {

            var genericCallback = function () {
                console.log("Happy Easter.");
            }

            templateLoader.initialize([ 'umlClassBoxGUI', 'tools' ], '/web/templates/' );

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

            if(config.horizontalConnectors) {
                this.setUpHorizontalConnectors(config.horizontalConnectors);
            }

            if(config.verticalConnectors) {
                this.setUpVerticalConnectors(config.verticalConnectors);
            }
        },

        setUpHorizontalConnectors : function (connectorsConfig) {

            var factory = new horizontalConnectorFactory();

            for(var i = 0; i < connectorsConfig.length; i++) {

                factory.createConnector(connectorsConfig[i]);
            }
        },

        setUpClasses : function (classesConfig) {

            for(var i =0; i < classesConfig.length; i++) {

                ClassBoxFactory(classesConfig[i]);
            }
        },

        setUpVerticalConnectors : function (connectorsConfig) {

            var factory = new verticalConnectorFactory();

            for(var i =0; i < connectorsConfig.length; i++) {

                factory.createConnector(connectorsConfig[i]);
            }
        }
    });
});