define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "commands/banner/editBannerTitle",
    "commands/banner/editBannerCreator",
    "commands/banner/editBannerDescription",
    "editor/editorModel"
    ], function (
        Process,
        help,
        parser,
        EditBannerTitle,
        EditBannerCreator,
        EditBannerDescription,
        EditorModel
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                   // this.diagramController = options.diagramController;
                    this.parentProcess = options.parentProcess;
                    this.jsonHelper = options.jsonHelper;
                    this.bannerProcess = options.bannerProcess;
                },


                handleInput : function (input) {

                    console.log("edit banner command handle input", arguments);

                    switch(input) {

                    case "title":
                        this.parentProcess.output("type title in command line");

                        this.parentProcess.setCurrentProcess(new EditBannerTitle({
                            parentProcess : this.parentProcess,
                            jsonHelper : this.jsonHelper,
                            editBannerProcess : this

                        }));
                    break;

                    case "description":

                       this.parentProcess.setMode(EditorModel.modes.editor);
                       this.parentProcess.setDisplay("edit this text");
                       this.parentProcess.setDisplayInstruction("edit the text below to specify the text that will appear in your banner description, then type 'save' in command line to save or cancel to cancel");

                       this.parentProcess.setCurrentProcess(new EditBannerDescription({

                           parentProcess : this.parentProcess,
                           jsonHelper : this.jsonHelper,
                           editBannerProcess : this

                       }));

                    break;

                    case "creator":

                        this.parentProcess.output("type creator in command line");

                        this.parentProcess.setCurrentProcess(new EditBannerCreator({
                            parentProcess : this.parentProcess,
                            jsonHelper : this.jsonHelper,
                            editBannerProcess : this

                        }));

                    break;

                    case "cancel" :
                    break;

                    case "build" :
                        this.jsonHelper.build();
                        this.parentProcess.yield();
                    break;
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