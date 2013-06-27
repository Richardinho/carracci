define(['BaseType',
        'templateLoader',
        'ToolBoxFactory',
        'toolsMenuItems',
        'horizontalConnectorFactory',
        'verticalConnectorFactory',
        'ClassBoxFactory',
        'jQuery',
        'CommandLineEditorView',
        'CommandLineController',
        'keymap',
        'projectJSON',
        'commands',
        'typeFactory' ], function ( BaseType,
                                    templateLoader,
                                    ToolBoxFactory,
                                    toolsMenuItems,
                                    horizontalConnectorFactory,
                                    verticalConnectorFactory,
                                    ClassBoxFactory,
                                    $,
                                    CommandLineEditorView,
                                    CommandLineController,
                                    keymap,
                                    projectJSONView,
                                    Commands,
                                    typeFactory) {

    return BaseType.extend({

        initialize : function () {

            var editor = new CommandLineEditorView({
                el : $('#command-line-editor-placeholder')
            });

            //  should pass the model into commands here.
            var commands = new Commands({

                "typeFactory" : typeFactory

            });

            new CommandLineController({
                keymap : keymap,
                commands : commands
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