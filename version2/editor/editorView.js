define(["core/BaseType", "underscore", "jquery"],function (BaseType, _, $) {

    return BaseType.extend({

        initialize : function (options) {

            this.$el = options.el;
            this.model = options.model;
            this.model.on("change", this.render, this);
            this.render();
        },

        render : function () {

            this.$el.html(this.template({

                oldCommands : this.model.get("oldCommands"),

                currentCommand : ">" + this.model.get("currentCommand")

            }));

            var objDiv = document.getElementById("command-editor");

            objDiv.scrollTop = objDiv.scrollHeight;
        },

        template : _.template($('#command-line-editor-template').html())


    });
});