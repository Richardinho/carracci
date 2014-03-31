define([
    "processes/process",
    "text!commands/export/help.html",
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

                    var imageFormat = parser.getArguments(input)[0];

                    return this.diagramController.export(imageFormat).then(function (data){

                        parentProcess.output(data);

                    }).catch(function(data){

                        parentProcess.output(data);

                    });
                }

            },{

                id : "export",

                help : function () {

                    return help;

                }
            });

        });