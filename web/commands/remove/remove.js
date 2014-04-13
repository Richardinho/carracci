define([
    "processes/process",
    "text!commands/remove/help.html",
    "commandLineParser"
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

                    var args = parser.getArguments(input);

                    if(!args[0] || !args[1]) {
                        parentProcess.output("valid arguments not supplied");
                        return Promise.reject();
                    }

                    return this.diagramController.remove(args[0], args[1]).then(function (data){

                        parentProcess.output(data);

                    }, function(data) {

                        parentProcess.output(data);

                    });
                }

            },{

                id : "remove",

                help : function () {

                    return help;

                }
            });

        });