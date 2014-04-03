define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "commands/banner/createBannerDescription",
    "editor/editorModel"
    ], function (
        Process,
        help,
        parser,
        CreateBannerDescription,
        EditorModel
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                   // this.diagramController = options.diagramController;
                    this.parentProcess = options.parentProcess;
                    this.jsonHelper = options.jsonHelper;
                },

                handleInput : function (title) {

                    // should save title into json helper

                    this.jsonHelper.setTitle(title);

                    //var instruction = "<span class='editor__instruction'>edit the text below to specify the text that will appear in your banner description</span>";

                    this.parentProcess.output("specify the descripton of your banner");

                    this.parentProcess.setMode(EditorModel.modes.editor);

                    this.parentProcess.setDisplay("edit this text");
                    this.parentProcess.setDisplayInstruction("edit the text below to specify the text that will appear in your banner description, then type 'save' in command line to save or cancel to cancel");

                    this.parentProcess.setCurrentProcess( new CreateBannerDescription({

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