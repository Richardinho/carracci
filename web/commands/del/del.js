define([
    "processes/process",
    "text!commands/context/help.html",
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


                    this.diagramController.removeSelected().then(function(data){

                        parentProcess.output(data);

                    }, function(data) {

                        parentProcess.output(data);

                    });
                    return Promise.resolve();
                }

            },{

                id : "del",

                help : function () {

                    return help;

                }
            });

        });