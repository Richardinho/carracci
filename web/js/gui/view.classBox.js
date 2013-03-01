define(['utility/extend', 'underscore', 'jQuery', 'Collection'], function (BaseType, _, $, Collection) {

    return BaseType.extend({


        initialize : function (options) {
            this.model = options.model;
            var classId = this.model.id;
            this.containerEl = options.containerEl;
            this.el = $('<div class=".gui ' + classId + '"></div>');
            this.containerEl.append(this.el);

            this.render();

            this.model.on("change", this.render, this);
            this.model.on("change:delete", this.render, this);
            this.model.on("changeBlah", this.render, this);
            this.model.on("add", this.render, this);

        },

        render : function () {

            $(this.el).html(this.template(this.model.toJSON()));
        },

        getMyEl : function () {
            return this.el;
        },

        template : _.template($('#gui-template').html())


    });
});