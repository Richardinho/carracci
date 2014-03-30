define([
    "processes/process",
    "text!commands/load/help.html",
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

                    var diagram = parser.getArguments(input)[0];

                    return this.diagramController.load(diagram).then(function (data){

                        parentProcess.output(data);

                    }).catch(function(data){

                        parentProcess.output(data);

                    });
                }

            },{

                id : "load",

                help : function () {

                    return help;

                }
            });

        });