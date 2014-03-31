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

                    var contextPath = this.diagramController.con();

                    parentProcess.output(contextPath);

                    return Promise.resolve();

                }

            },{

                id : "context",

                help : function () {

                    return help;

                }
            });

        });