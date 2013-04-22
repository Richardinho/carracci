define(['BaseType', 'underscore', 'jQuery'],function (BaseType, _, $) {


    return BaseType.extend({

        initialize : function (config) {

            _.bindAll(this, "handleClick");

            this.model = config.model;
            this.view = config.view;


            this.view.el.click(this.handleClick);
        },

        handleClick : function (event) {
            var keyValue = $(event.target).data("button");
            var index = this.model.buttons.findFirst("name", keyValue);
            this.model.buttons.get(index).get('action').call(null);
        }


    });
});