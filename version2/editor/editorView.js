define([
    "core/BaseType",
    "underscore",
    "jquery",
    "jqueryMCustomScrollbar",
    "jqueryUICustom"
    ],
    function (
    BaseType,
    _,
    $,
    Scrollbar,
    blah) {

    return BaseType.extend({

        initialize : function (options) {

            this.placeholder = options.el;
            this.$el = $('<div id="container">');
            this.$el.draggable()

            this.placeholder.append(this.$el);
            this.model = options.model;
            this.model.on("change", this.render, this);
            this.model.on("appendChar", this.appendCharacter, this);

            this.render();


        },

        appendCharacter : function () {

            this.$el.find(".current-command").html(">" + this.model.get("currentCommand"));
        },

        render : function () {
            this.$el.html(this.template({

                oldCommands : this.model.get("oldCommands"),

                currentCommand : ">" + this.model.get("currentCommand")

            }));

            this.$el.css("height", this.model.get("height"));

            var objDiv = document.getElementById('container');
            objDiv.scrollTop = objDiv.scrollHeight;

            this.$el.mCustomScrollbar();
            this.$el.mCustomScrollbar("scrollTo", "bottom");

        },

        template : _.template($('#command-line-editor-template').html())


    });
});