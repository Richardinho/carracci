define(['BaseType', 'underscore', 'templateLoader'], function (BaseType, _, templateLoader ) {

    return BaseType.extend({

        initialize : function (options) {
            this.template = this._getTemplate();
            this.model = options.model;
            this.el = options.el;
            this.render();
            this.model.on("change", this.render, this);
        },

        render : function () {
            var data = {};
            var visible = this.model.get("visible");
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

        _getTemplate : function () {
            return _.template($('#tools-template').html());
        }
    });
});