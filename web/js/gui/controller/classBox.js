define(['BaseType', 'underscore', 'jQuery'], function (BaseType, _, $) {


    return BaseType.extend({


        initialize : function (options) {

        _.bindAll(this, "changeWidth", "changeXCood", "handleVisibilityClick", "addProperty", "changeClassName", "deleteProperty", "changePropertyName", "changePropertyType");
            this.model = options.model;
            this.view = options.view;
            $('input[name=xCood]').on('change', this.changeXCood);
            var classId = this.model.id;
            $('.' + classId).find('.addProperty input').live("click", this.addProperty);
            $('.' + classId).find('.changeClassName  input').live("change", this.changeClassName);
            $('.' + classId).find('.visibility').live("click", this.handleVisibilityClick);
            $('.' + classId).find('.delete input').live("click", this.deleteProperty);
            $('.' + classId).find('.name input').live("change", this.changePropertyName);
            $('.' + classId).find('.type input').live("change", this.changePropertyType);
        },

        handleVisibilityClick : function (event) {
            var index = $(event.target).parent().data("index");
            this.model.updatePropertyVisibility(index);
        },

        addProperty : function () {
            this.model.addProperty();
        },

        changeClassName : function (event) {
            console.log("in controller")
            var newName = event.currentTarget.value;
            this.model.changeClassName(newName);
        },

        changePropertyName : function (event) {
            var index,
                newName;
            index = $(event.target).parent().parent().data("index");
            newName = $(event.target).attr('value');
            this.model.updatePropertyName(index, newName);
        },

        changePropertyType : function (event) {
            var index,
                newType;

            index = $(event.target).parent().parent().data("index");
            newType = $(event.target).attr('value');
            this.model.updatePropertyType(index, newType);
        },

        deleteProperty : function (event) {
            var index = $(event.target).parent().parent().data("index");
            this.model.deleteProperty(index);
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