
define([ 'jquery',
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
         'diagram/componentFactory',
         'editor/editor'],

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
                    ComponentFactory,
                    EditorModule) {

    return {

        start : function () {

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


                var editor = new EditorModule({

                    placeholder : $('#editor-placeholder'),
                    keymap : keymap,
                    commandObject : diagramController,
                    commands : [
                        'help',
                        'create',
                        'use',
                        'con',
                        'set',
                        'remove',
                        'show',
                        'load',
                        'export'
                    ],
                    preferences : {

                        width : 300,
                        height : 500,
                        backgroundColor : "red",
                        style : "default" // might specify a particular css prefix
                    }

                });

            });
        }
    };
});





