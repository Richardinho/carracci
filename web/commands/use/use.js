define([
    "processes/process",
    "text!commands/use/help.html",
    "commandLineParser"
    ], function (
        Process,
        help,
        parser
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {


                    this.diagramController = options.diagramController;
                },

                start : function (parentProcess, input) {

                    var args = parser.getArguments(input);

                    var argsArray;

                    if(args[0] && args[1]) {

                        argsArray = [args[0], args[1]];

                    } else if(args[0]) {

                        argsArray = [args[0]]

                    } else {

                        return Promise.reject("valid arguments not supplied");
                    }

                    return this.diagramController.use.apply(this.diagramController, argsArray).then(function (data){

                        parentProcess.output(data);

                    }).catch(function(data){

                        parentProcess.output(data);

                    });
                }

            },{

                id : "use",

                help : function () {

                    return help;

                }
            });

        });