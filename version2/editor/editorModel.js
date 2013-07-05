define(["core/Model", "jquery"],function (Model, $) {

    return Model.extend({

        minHeight : "20px",

        maxHeight : "300px",

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            this.diagramController= options.diagramController;
        },

        update : function (oldCommand, message) {

            this.get("oldCommands").push(oldCommand);
            if(message) {
                this.get("oldCommands").push(message);
            }
            this.set("currentCommand","");
            this.fire("change");
        },

        setMaxHeight : function () {

            this.set("height", this.maxHeight)
            this.fire("reformat")

        },

        setMinHeight : function () {

            this.set("height", this.minHeight)
             this.fire("reformat")
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


        minimize : function () {

            this.set("height", this.minHeight)
        },

        maximize : function () {

            this.set("height", this.maxHeight)
        }



    });
});