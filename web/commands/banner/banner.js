define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "editor/editorModel",
    "commands/banner/editBannerProcess",
    "commands/banner/createBannerProcess",
    "diagram/banner/bannerJSONHelper"
    ], function (
        Process,
        help,
        parser,
        EditorModel,
        EditBannerProcess,
        CreateBannerProcess,
        JSONHelper
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                    this.diagramController = options.diagramController;
                },


                start : function (parentProcess, input) {

                    if(!this.diagramController.diagramExists()) {

                        parentProcess.output("no diagram has been created");
                        return Promise.resolve();
                    }

                    if(this.bannerExists()){
                        parentProcess.output("banner already exists");
                        return Promise.resolve();
                    }


                    var jsonHelper;

                    parentProcess.output("creating banner oh year");

                    var jsonHelper = new JSONHelper({
                        diagramController : this.diagramController
                    });

                    var author = {

                        challenge : "what is the name of the author?",

                        handleInput : function (input) {

                            jsonHelper.setAuthor(input);
                            jsonHelper.build();
                            parentProcess.output("building banner");
                            parentProcess.yield();

                            return Promise.resolve();

                        }

                    };

                    var description = {

                        next : author,

                        challenge : "what text do you wish to display?",

                        handleInput : function(text) {


                            jsonHelper.setDescription(text);
                            parentProcess.output(this.next.challenge);
                            parentProcess.setCurrentProcess(this.next);

                            return Promise.resolve();

                        }


                    };

                    var title = {

                        next : description,

                        challenge : "what is the title for your banner?",

                        handleInput : function (input) {

                            parentProcess.output("title is: " + input);
                            jsonHelper.setTitle(input);
                            parentProcess.output(this.next.challenge);
                            parentProcess.setCurrentProcess(this.next);

                            return Promise.resolve();


                        }


                    }
                    parentProcess.output(title.challenge);
                    parentProcess.setCurrentProcess(title);

                    return Promise.resolve();

                },

                bannerExists : function () {

                    return this.diagramController.bannerExists();

                }

            },{

                id : "banner",

                help : function () {

                    return help;

                }
            });

        });