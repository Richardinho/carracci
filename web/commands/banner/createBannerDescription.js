define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "commands/banner/createBannerAuthor",
    "editor/editorModel"
    ], function (
        Process,
        help,
        parser,
        CreateBannerAuthor,
        EditorModel
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

                    console.log(arguments, input);
                    this.parentProcess.resetDisplayInstruction();

                    if(input === "save") {


                        var description = this.parentProcess.getEditorContents();

                        console.log(description);

                        this.jsonHelper.setDescription(description);

                        this.parentProcess.setMode(EditorModel.modes.commandLine);

                        this.parentProcess.output("specify the author of your banner");

                        this.parentProcess.setCurrentProcess( new CreateBannerAuthor({

                            parentProcess : this.parentProcess,
                            jsonHelper : this.jsonHelper

                        }));

                    } else {
                        this.parentProcess.output("exiting banner process");
                        this.parentProcess.yield();
                    }

                    return Promise.resolve();

                },

            },{

                id : "dfddfd",  // do we need this, can we delete?

                help : function () {

                    return help;

                }
            });

        });