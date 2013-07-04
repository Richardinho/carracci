define(["core/Model", "jquery"],function (Model, $) {

    return Model.extend({

        minHeight : "20px",

        maxHeight : "300px",

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.diagramController= options.diagramController;
        },

        parseCommand : function (command) {
            return command.split(/[\s]+/);
        },


        update : function () {

            var response;

            var commandArray = this.parseCommand(this.get("currentCommand"));

            var that = this;

            if(!this.handleEditorCommand(commandArray)) {

                $.when(
                    /*  all commands must return a deferred object with resolved data of the form

                        {
                            error : true|undefined,
                            message : ""|undefined,
                            name : "" | undefined  // for errors

                        }

                    */
                    this.diagramController.process(commandArray)

                    ).then( function(response, textStatus, jqXHR){
                        that.handleResponse(response, commandArray);

                    });

            }
        },

        handleEditorCommand : function (commandArray) {
            var command = commandArray[0];

            switch(command) {

            case "min" :
                this.minimize();
                this.handleResponse({}, commandArray);
                return true;
            case "max" :
                this.maximize();
                this.handleResponse({}, commandArray);
                return true;
            default :
                return false;

            }

        },

        appendChar : function (char) {
            var currentCommand = this.get("currentCommand");
            this.set("currentCommand", currentCommand + char);
            this.fire("appendChar");
        },

        backspace : function () {
            var currentCommand = this.get("currentCommand");
            currentCommand = currentCommand.substring(0, currentCommand.length -1);
            this.set("currentCommand", currentCommand);
            this.fire("appendChar");
        },

        /* This is for displaying in the editor when the command returns a message
            e.g. for help menus
         */
        handleResponse : function (response, commandArray) {

            if(response.error) {

                var errorMessage = this.formatError(response);
                this.get("oldCommands").push(errorMessage);

            } else if(response.message) {

                this.get("oldCommands").push(response.message);
            }
            this.get("oldCommands").push(commandArray.join(" "));

            this.set("currentCommand", "");
            this.fire("change");



        },

        minimize : function () {

            this.set("height", this.minHeight)
        },

        maximize : function () {

            this.set("height", this.maxHeight)
        },

        formatError : function (error) {
            var result = []

            if(error.name) {
                result.push(error.name);
            }
            if(error.message) {
                result.push(error.message);
            }
            return result.join(":")


        }

    });
});