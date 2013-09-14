define(
    [
    'BaseType',
    'editor/editorView',
    'editor/editorModel',
    'editor/editorController',
    'editor/commandProcessor',
    'editor/keymap'
        ],

    function (
        BaseType,
        View,
        Model,
        Controller,
        CommandProcessor,
        keymap
        ) {
    //  blah
    return BaseType.extend({

        initialize : function (options) {

            var model = new Model();

            model.setAttributes({

                oldCommands : [ "For best results, use 'Chrome' browser. Type 'help' to display help page" ],
                currentCommand : ""
            });

            var view = new View({
                el : options.placeholder,
                model : model
            });

            var commandProcessor = new CommandProcessor();

            commandProcessor.addCommands( options.commandObject, options.commands );

            new Controller({
                keymap : keymap,
                model : model,
                view : view,
                commandProcessor : commandProcessor
            });
        }
    });
});