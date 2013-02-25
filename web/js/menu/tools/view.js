define(['utility/extend', 'underscore'], function (BaseType, _) {

    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;
            this.el = options.el;
            this.render();
            this.model.on("change", this.render, this);
        },

        render : function () {
            var data = {};
            var visible = this.model.get("visible");
            data.hidden = visible ? "" : "hidden";
            this.el.html(this.template(data));
        },

        template : _.template($('#tools-template').html()),


    });
});