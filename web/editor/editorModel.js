define(["Model", "jquery"],function (Model, $) {

    return Model.extend({

        minHeight : 20,

        maxHeight : 500,

        minWidth : 300,

        maxWidth : 800,

        initialize : function (options) {

            Model.prototype.initialize.call(this, options);
            //this.diagramController= options.diagramController;
        },

        update : function (oldCommand, message) {

            this.get("oldCommands").push(oldCommand);
            if(message) {
                this.get("oldCommands").push(message);
            }
            this.set("currentCommand","");
            this.fire("change");
        },

        setMax : function () {

            this.set("height", this.maxHeight);
            this.set("width", this.maxWidth);
            this.fire("reformat")

        },

        clear : function () {

            this.set("oldCommands", []);
            this.set("currentCommand","");
            this.fire("change");
        },

        setHeight : function (height) {
            this.set("height", height);
            this.fire("reformat");
        },

        setWidth : function (width) {
            this.set("width", width);
            this.fire("reformat");
        },

        setMin : function () {

            this.set("height", this.minHeight);
            this.set("width", this.minWidth);
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