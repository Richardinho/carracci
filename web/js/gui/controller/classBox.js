define(['utility/extend', 'underscore', 'jQuery'], function (BaseType, _, $) {


    return BaseType.extend({


        initialize : function (options) {

        _.bindAll(this, "changeWidth", "changeXCood", "handleVisibilityClick", "addProperty");
            this.model = options.model;
            this.view = options.view;
            $('input[name=xCood]').on('change', this.changeXCood);
            var classId = this.model.id;
            $('.' + classId).find('.visibility').live("click", this.handleVisibilityClick);
            $('.' + classId).find('.addProperty input').live("click", this.addProperty);
        },

        handleVisibilityClick : function (event) {
            console.log("visibility click");
            var index = $(event.target).data("index");
            this.model.updatePropertyVisibility(index);
        },

        addProperty : function () {
            this.model.addProperty();
        },

        changeWidth : function (event) {
            var width = event.currentTarget.value;
            this.model.setWidth(width);

        },

        changeXCood : function (event) {
            this.model.setXCood(event.currentTarget.value)
        }


    });
});