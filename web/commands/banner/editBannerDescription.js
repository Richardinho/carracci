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


                handleInput : function (input) {

                    this.parentProcess.resetDisplayInstruction();

                    if(input === "save") {


                        var description = this.parentProcess.getEditorContents();

                        console.log(description);

                        this.jsonHelper.setDescription(description);

                        this.parentProcess.setMode(EditorModel.modes.commandLine);

                        this.parentProcess.output("select another property to edit or cancel to exit process.");
                        this.parentProcess.output("title");
                        this.parentProcess.output("creator");

                        this.parentProcess.setCurrentProcess(this.editBannerProcess);

                    } else {
                        this.parentProcess.output("exiting banner process");
                        this.parentProcess.yield();
                    }
                    return Promise.resolve();

                }

            },{

                id : "dfddfd",  // do we need this, can we delete?

                help : function () {

                    return help;

                }
            });

        });