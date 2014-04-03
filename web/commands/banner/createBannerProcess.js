define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "commands/banner/createBannerTitle"
    ], function (
        Process,
        help,
        parser,
        CreateBannerTitle
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                   // this.diagramController = options.diagramController;
                   this.parentProcess = options.parentProcess;
                   this.jsonHelper = options.jsonHelper;
                },


                handleInput : function (input) {

                    console.log("create banner command handle input", arguments);

                    this.parentProcess.output("specify the title of your banner");

                    this.parentProcess.setCurrentProcess(new CreateBannerTitle({

                        parentProcess : this.parentProcess,
                        jsonHelper : this.jsonHelper
                    }));

                    return Promise.resolve();

                },

            },{

                id : "dfddfd",  // do we need this, can we delete?

                help : function () {

                    return help;

                }
            });

        });