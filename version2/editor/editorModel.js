define(["core/Model"],function (Model) {

    return Model.extend({

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.diagramController= options.diagramController;
        },

        update : function () {
            var response;
            var command = this.get("currentCommand");
            try {

                response = this.diagramController.process(command)
                this.get("oldCommands").push(command);
                this.handleResponse(response);

            } catch(e) {
                var errorMessage = this.formatError(e);
                this.get("oldCommands").push(errorMessage);
            }
            this.set("currentCommand", "");
            this.fire("change");
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

        /* i handle responses differently because I might want to apply some formatting
        to them which is different from commands */
        handleResponse : function (response) {
            if(response) {
                this.get("oldCommands").push(response);
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
            if(error.fileName) {
                result.push(error.fileName);
            }
            if(error.lineNumber) {
                result.push(error.fileName);
            }
            return result.join(":")


        }

    });
});