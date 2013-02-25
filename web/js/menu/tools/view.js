define(['utility/extend', 'underscore'], function (BaseType, _) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.el = options.el;
            this.render();
            this.model.on("change", this.render, this);
        },

        render : function () {
            console.log("render tools")
            var data = {};
            var visible = this.model.get("visible");
            console.log("visible", visible)
            var element = $('<div></div>');
            if(!visible) {
                element.addClass('hidden');
            } else {
                element.removeClass('hidden');
            }
            element.append(this.template());
            this.el.html(element);
        },

        getCloseButton : function () {
            return this.el.find('.close-button');
        },

        getUmlClassButton : function () {
            return this.el.find('.uml-class-button');
        },

        template : _.template($('#tools-template').html())
    });
});