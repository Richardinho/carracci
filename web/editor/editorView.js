define([
    "BaseType",
    "underscore",
    "jquery",
    ],
    function (
    BaseType,
    _,
    $
    ) {

    return BaseType.extend({

        initialize : function (options) {

            this.placeholder = options.el;
            this.$el = $('<div id="container">');

            this.placeholder.append(this.$el);
            this.model = options.model;
            this.model.on("change", this.render, this);
            this.model.on("appendChar", this.appendCharacter, this);
            this.model.on("reformat", this.reformat, this);

            this.render();


        },

        appendCharacter : function () {

            this.$el.find(".current-command").html(">" + this.model.get("currentCommand"));
        },

        reformat : function () {

            this.$el.css("height", this.model.get("height"));
            this.$el.css("width", this.model.get("width"));
            var objDiv = document.getElementById('container');
            objDiv.scrollTop = objDiv.scrollHeight;
        },

        render : function () {
            this.$el.html(this.template({

                oldCommands : this.model.get("oldCommands"),

                currentCommand : ">" + this.model.get("currentCommand")

            }));

            this.$el.css("height", this.model.get("height"));

            var objDiv = document.getElementById('container');
            objDiv.scrollTop = objDiv.scrollHeight;

            console.log(objDiv.scrollHeight)


        },

        getCurrentCommand : function () {
            return this.$el.find(".current-command").html().substring(4);

        },

        template : _.template($('#command-line-editor-template').html())


    });
});