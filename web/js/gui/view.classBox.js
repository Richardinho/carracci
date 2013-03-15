define(['BaseType',
        'underscore',
        'jQuery',
        'Collection',
        'templateLoader'], function (BaseType, _, $, Collection, templateLoader) {

    return BaseType.extend({

        initialize : function (options) {
            this.template = this._getTemplate();
            this.model = options.model;
            var classId = this.model.id;
            this.containerEl = options.containerEl;
            this.el = $('<div class=".gui ' + classId + '"></div>');
            this.containerEl.append(this.el);

            this.render();

            this.model.on("change:delete", this.render, this);
            this.model.on("change:add", this.render, this);
            this.model.on("change:visibility", this.render, this);

        },

        render : function () {

            $(this.el).html(this.template(this.model.toJSON()));
        },

        getMyEl : function () {
            return this.el;
        },

        _getTemplate : function () {

            return _.template($('#gui-class-template').html());
        },

        getType : function () {
            return "ClassGuiView";
        }


    });
});