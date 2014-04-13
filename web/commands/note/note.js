define([
    "processes/process",
    "text!commands/load/help.html",
    "commandLineParser",
    "editor/editorModel",
    "commands/note/noteJSONHelper"
    ], function (
        Process,
        help,
        parser,
        EditorModel,
        JSONHelper
        ) {

            "use strict";

            return Process.extend({

                initialize : function (options) {

                    this.diagramController = options.diagramController;
                },

                handleInput : function () {

                    return Promise.resolve();

                },

                start : function (parentProcess, input) {


                    if(!this.diagramController.diagramExists()) {

                        parentProcess.output("A diagram must exists and you must be within it's context in order to create a note");
                        return Promise.reject();
                    }

                    var artifactInfo = this.diagramController.getSelectedArtifactInfo();

                    if(!artifactInfo) {

                        parentProcess.output("a type must be selected. double click on a type to select it and then try using 'note' command again");
                        return Promise.reject();
                    }

                    if(artifactInfo.artifactType === 'type') {

                        return this.createNote(artifactInfo.name, parentProcess);

                    } else if(artifactInfo.artifactType === 'note') {

                        return this.editNote(artifactInfo.name, parentProcess);

                    } else {

                        parentProcess.output("select a type to add a note, or select a note to edit it");
                        return Promise.reject();
                    }

                },

                createNote : function (typeName, parentProcess) {

                    var jsonHelper = new JSONHelper({
                        diagramController : this.diagramController,
                        editMode : false
                    });

                    jsonHelper.setType(typeName);

                    var self = this;

                    var text = {

                        challenge : "enter text to be displayed in your note",

                        handleInput : function (text) {

                            jsonHelper.setText(text);
                            jsonHelper.build();

                            parentProcess.yield();

                            return Promise.resolve();
                        }
                    };

                    parentProcess.output(text.challenge);
                    parentProcess.setCurrentProcess(text);

                    return Promise.resolve();

                },

                editNote : function (name, parentProcess) {

                    var editText = {

                        handleInput : function (input) {

                            if(input === "save") {


                                parentProcess.output("edit has been saved");
                                parentProcess.setMode(EditorModel.modes.command);
                                parentProcess.yield();
                            }


                        }

                    }

                    parentProcess.setMode(EditorModel.modes.editor);
                    parentProcess.setDisplayInstruction("edit the following text and input 'save' on the command line to update in diagram");
                    parentProcess.setDisplay("edit this note:");
                    parentProcess.setCurrentProcess(editText);


                    return Promise.resolve();
                }

            },{

                id : "note",

                help : function () {

                    return help;

                }
            });

        });