define([
    "processes/process",
    "text!commands/set/help.html",
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

                    var artifactType  = parser.getArguments(input)[0];
                    var artifactName  = parser.getArguments(input)[1];


                    if(!artifactType || !artifactName) return Promise.reject("You must supply two arguments");

                    return this.diagramController.set(artifactType, artifactName).then(function (data){

                        parentProcess.output(data);

                    }).catch(function(data){

                        parentProcess.output(data);

                    });
                }

            },{

                id : "set",

                help : function () {

                    return help;

                }
            });

        });