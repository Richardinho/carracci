define(['BaseType', 'underscore'],function (BaseType, _) {


    return new BaseType.extend({


        initialize : function (options) {

            //_.bindAll(this, "handleClick");

            //this.view = options.view;

            //this.view.el.click(this.handleClick)
        },

        show : function (model, x, y) {
            this.model = model;
            //this.view.show(x, y);
            this.x = x;
            this.y = y;
        },

        handleClick : function (event) {

            if($(event.target).data("action") === "edit") {
                this.view.makeMenuVisible(this.x, this.y);
            }
        }

    });
});