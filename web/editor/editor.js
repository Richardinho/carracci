define(
    [
    'core/BaseType',
    'editor/editorView',
    'editor/editorModel',
    'editor/editorController',
    'diagram/diagramCommands',
        ],

    function (
        BaseType,
        View,
        Model,
        Controller,
        Commands
        ) {

    return BaseType.extend({

        initialize : function (options) {

            var model = new Model();

            model.setAttributes({

                oldCommands : [ "Type 'help' to display help page" ],
                currentCommand : ""
            });

            var view = new View({
                el : options.placeholder,
                model : model
            });

            var commands = new Commands();

            commands.addCommands( options.commandObject, options.commands );

            new Controller({
                keymap : options.keymap,
                model : model,
                view : view,
                commands : commands
            });
        }
    });
});