define(['BaseType', 'underscore'],function (BaseType, _) {


    return BaseType.extend({

        initialize : function (config) {
            this.model = config.model;
            this.el = config.el;

            this.render();
        },

        render : function () {

            this.model.buttons.each(function (index, button) {
                this.el.append(this.createButtonView(button.toJSON()));
            }, this);
        },

        template : _.template('<div><img data-button = "<%= name %>" src="web/images/<%= image %>"></div>'),

        createButtonView : function (button) {

             return this.template(button);
        }
    });
});