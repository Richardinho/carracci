define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "editor/editorModel"
    ], function (
        Process,
        help,
        parser,
        EditorModel
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                   // this.diagramController = options.diagramController;
                    this.parentProcess = options.parentProcess;
                    this.jsonHelper = options.jsonHelper;
                    this.editBannerProcess = options.editBannerProcess;
                },


                handleInput : function (title) {

                    // should save title into json helper

                    this.jsonHelper.setTitle(title);

                    this.parentProcess.output("select another property to edit or cancel to exit process.");
                    this.parentProcess.output("description");
                    this.parentProcess.output("creator");

                    this.parentProcess.setCurrentProcess(this.editBannerProcess);

                    return Promise.resolve();

                }

            },{

                id : "dfddfd",  // do we need this, can we delete?

                help : function () {

                    return help;

                }
            });

        });