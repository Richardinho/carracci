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

                   // this.diagramController = options.diagramController;
                    this.parentProcess = options.parentProcess;
                    this.jsonHelper = options.jsonHelper;
                },


                handleInput : function (input) {

                    // should save title into json helper

                    this.jsonHelper.setAuthor(input);

                    this.jsonHelper.build();

                    console.log(this.jsonHelper.banner);

                    this.parentProcess.output("will create banner now");

                    this.parentProcess.yield();

                    return Promise.resolve();

                },

            },{

                id : "dfddfd",  // do we need this, can we delete?

                help : function () {

                    return help;

                }
            });

        });