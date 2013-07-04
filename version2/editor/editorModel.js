define(["core/Model", "jquery"],function (Model, $) {

    return Model.extend({

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.diagramController= options.diagramController;
        },

        update : function () {

            var response;
            var command = this.get("currentCommand");
            var that = this;

            $.when(
                /*  all commands must return a deferred object with resolved data of the form

                    {
                        error : true|undefined,
                        message : ""|undefined,
                        name : "" | undefined  // for errors

                    }

                */
                this.diagramController.process(command)

                ).then( function(response, textStatus, jqXHR){

                    if(response.error) {

                        var errorMessage = that.formatError(response);
                        that.get("oldCommands").push(errorMessage);

                    } else {

                        that.handleResponse(response);

                    }
                    that.get("oldCommands").push(command);

                    that.set("currentCommand", "");
                    that.fire("change");
                });
        },

        appendChar : function (char) {
            var currentCommand = this.get("currentCommand");
            this.set("currentCommand", currentCommand + char);
            this.fire("change");
        },

        backspace : function () {
            var currentCommand = this.get("currentCommand");
            currentCommand = currentCommand.substring(0, currentCommand.length -1);
            this.set("currentCommand", currentCommand);
            this.fire("change");
        },

        /* This is for displaying in the editor when the command returns a message
            e.g. for help menus
         */
        handleResponse : function (response) {
            if(response.message) {
                this.get("oldCommands").push(response.message);
            }
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