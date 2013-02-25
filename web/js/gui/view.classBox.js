define(['utility/extend', 'underscore', 'jQuery', 'Collection'], function (BaseType, _, $, Collection) {


    return BaseType.extend({


        initialize : function (options) {
            this.model = options.model;

            this.containerEl = options.containerEl;
            this.el = $('<div class=".gui"></div>')
            this.containerEl.append(this.el);

            this.render();

            this.model.on("change", this.render, this);
            this.model.on("add", this.render, this);

        },

        render : function () {

            $(this.el).html(this.template(this.model.toJSON()));
        },

        template : _.template($('#gui-template').html())


    });
});