define(['BaseType',
        'templateLoader',
        'ToolBoxFactory',
        'toolsMenuItems',
        'horizontalConnectorFactory',
        'verticalConnectorFactory',
        'ClassBoxFactory',
        'jQuery' ], function ( BaseType,
                                        templateLoader,
                                        ToolBoxFactory,
                                        toolsMenuItems,
                                        horizontalConnectorFactory,
                                        verticalConnectorFactory,
                                        ClassBoxFactory,
                                        $ ) {

    return BaseType.extend({

        initialize : function () {

            templateLoader.initialize([ 'umlClassBoxGUI', 'tools' ], '/web/templates/' );

            var toolbox = ToolBoxFactory({

                buttons : [
                    {
                        name : "umlClass",
                        action : toolsMenuItems.createUmlClass,
                        image : "umlClassIcon.gif"
                    },
                    {
                        name : "horizontalConnector",
                        action : toolsMenuItems.createHorizontalConnector,
                        image : "horizontalConnector.png"
                    },
                    {
                        name : "verticalConnector",
                        action : toolsMenuItems.createVerticalConnector,
                        image : "verticalConnector.png"
                    }
                ],

                el : $('#toolbox .icons')
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