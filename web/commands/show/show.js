define([
    "processes/process",
    "text!commands/show/help.html",
    "commandLineParser",
    "editor/editorModel",
    ], function (
        Process,
        help,
        parser,
        EditorModel
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {


                    this.diagramController = options.diagramController;
                },

                start : function (parentProcess, input) {

                    var json = this.diagramController.show();

                    parentProcess.setMode(EditorModel.modes.display);

                    parentProcess.setDisplay(json);

                    return Promise.resolve();
                }

            },{

                id : "show",

                help : function () {

                    return help;

                }
            });

        });