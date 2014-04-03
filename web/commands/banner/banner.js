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

                    this.questionIndex = 0;

                    this.diagramController = options.diagramController;
                },


                setTitle : function (title) {
                    this.bannerJSONHelper.setTitle(title);
                },

                setDescription : function (description) {
                    this.bannerJSONHelper.setDescription(description);
                },

                setAuthor : function (author) {
                    this.bannerJSONHelper.setAuthor(author);
                },

                setDate: function (date) {
                    this.bannerJSONHelper.setDate(date);
                },

                handleInput : function () {


                    return Promise.resolve();

                },

                start : function (parentProcess, input) {



                    if(!this.bannerExists()) {
                        //create mode
                        this.editorMode = false;
                        var bannerJSONHelper = new JSONHelper({
                            editMode : false,
                            diagramController :  this.diagramController
                        });

                        parentProcess.output("in create mode");
                        parentProcess.setCurrentProcess(new CreateBannerProcess({

                            parentProcess : parentProcess,
                            jsonHelper : bannerJSONHelper,


                        }));

                    } else {

                        //editor mode
                        var bannerJSONHelper = new JSONHelper({
                            editMode  : true,
                            diagramController :  this.diagramController

                        });


                        parentProcess.output("select another property to edit or cancel to exit process.");
                        parentProcess.output("title");
                        parentProcess.output("description");
                        parentProcess.output("creator");
                        parentProcess.output("or 'cancel' to exit process");

                        this.editorBannerProcess = new EditBannerProcess({
                            parentProcess : parentProcess,
                            jsonHelper    : bannerJSONHelper,
                            bannerProcess : this
                        });

                        parentProcess.setCurrentProcess(this.editorBannerProcess);
                    }

                    return Promise.resolve("everything is a ok");
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