
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
                    'help', 'create', 'use', 'con', 'set', 'remove', 'show', 'load', 'export'
                ]);

                new EditorController({
                    keymap : keymap,
                    model : editorModel,
                    view : editorView,
                    commands : diagramCommands
                });
            });
        }
    };
});





