

require.config({

    shim : {

        'jquery' : {
            exports : '$'
        },

        'underscore' : {
            exports : '_'
        },

        'jqueryMCustomScrollbar': ['jquery'],

        'jqueryUICustom' : ['jquery']

    },

    paths : {
    /* points to lib folder within version2 */
        jquery : "lib/jquery-1.8.0",
        underscore : "lib/underscore",
        raphael : "lib/raphael.2.1.0.amd",
        raphaelCore : "lib/raphael.2.1.0.core",
        svg : "utility/svg",
        raphaelSVG : "lib/raphael.2.1.0.svg",
        raphaelVML : "lib/raphael.2.1.0.vml",
        eve : "lib/eve.0.3.4",
        jqueryMCustomScrollbar : "lib/custom-scrollbar-plugin/js/minified/jquery.mCustomScrollbar.min",
        jqueryUICustom : "lib/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min"
    }
});


require(['jquery',
         'editor/editorView',
         'editor/editorModel',
         'editor/editorController',
         'utility/keymap',
         'diagram/diagramController',
         'diagram/diagramModel2',
         'diagram/types/typeView',
         'diagram/types/typeController',
         'utility/idGenerator',
         'diagram/connectors/horizontalConnectorFactory',
         'diagram/connectors/verticalConnectorFactory',
         'diagram/diagramCommands',
         'diagram/componentFactory'],

         function ( $,
                    EditorView,
                    EditorModel,
                    EditorController,
                    keymap,
                    DiagramController,
                    DiagramModel,
                    TypeView,
                    TypeController,
                    idGenerator,
                    horizontalConnectorFactory,
                    verticalConnectorFactory,
                    DiagramCommands,
                    ComponentFactory) {

    $(document).ready(function () {


        var diagramModel = new DiagramModel();

        var componentFactory = new ComponentFactory({
            diagramModel : diagramModel,
            horizontalConnectorFactory : horizontalConnectorFactory,
            verticalConnectorFactory : verticalConnectorFactory
        })

        var diagramController = new DiagramController({
            diagramModel : diagramModel,
            componentFactory : componentFactory
        });

        var editorModel = new EditorModel({
            diagramController : diagramController
        });

        editorModel.setAttributes({

            oldCommands : [ "Type 'help' to display help page" ],
            currentCommand : ""
        });

        var editorView = new EditorView({
            el : $('#editor-placeholder'),
            model : editorModel
        });

        var diagramCommands = new DiagramCommands();

        diagramCommands.addCommands(diagramController, [
            'help', 'create', 'use', 'con', 'set', 'remove', 'show', 'load'
        ]);

        new EditorController({
            keymap : keymap,
            model : editorModel,
            view : editorView,
            commands : diagramCommands
        });


    });
});





