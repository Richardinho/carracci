define([
    "processes/process",
    "text!commands/create/help.html",
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
                    var artifactValue = parser.getArguments(input)[2];


                    if(!artifactType || !artifactName) return Promise.reject("You must supply two arguments");

                    var args = [artifactType, artifactName];

                    if(artifactValue) {

                        args.push(artifactValue);
                    }

                    return this.diagramController.create.apply(this.diagramController, args).then(function (data){

                        parentProcess.output(data);

                    }).catch(function(data){

                        parentProcess.output(data);

                    });
                }

            },{

                id : "create",

                help : function () {

                    return help;

                }
            });

        });