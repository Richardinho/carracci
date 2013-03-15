define(['BaseType', 'underscore', 'jQuery'], function (BaseType, _, $) {


    return BaseType.extend({


        initialize : function (options) {

        _.bindAll(this, "changeWidth", "changeXCood", "handleVisibilityClick", "addProperty", "changeMethodReturnType", "changeClassName", "deleteMember", "changePropertyName", "changePropertyType", "addMethod", "changeMethodName");
            this.model = options.model;
            this.view = options.view;
            $('input[name=xCood]').on('change', this.changeXCood);
            var classId = this.model.id;
            $('.' + classId).find('.addProperty input').live("click", this.addProperty);
            $('.' + classId).find('.addMethod input').live("click", this.addMethod);
            $('.' + classId).find('.changeClassName  input').live("change", this.changeClassName);
            $('.' + classId).find('.visibility').live("click", this.handleVisibilityClick);
            $('.' + classId).find('.visibility').live("click", this.handleVisibilityClick);
            $('.' + classId).find('.delete input').live("click", this.deleteMember);
            $('.' + classId).find('.property .name input').live("change", this.changePropertyName);
            $('.' + classId).find('.method .name input').live("change", this.changeMethodName);
            $('.' + classId).find('.method .returnType input').live("change", this.changeMethodReturnType);
            $('.' + classId).find('.property .type input').live("change", this.changePropertyType);
        },

        handleVisibilityClick : function (event) {
            var index = $(event.target).parent().data("index");
            this.model.updateVisibility(index);
        },

        addProperty : function () {
            this.model.addProperty();
        },

        changeMethodName : function (event) {
            var domData = $(event.target).parent().parent().data("index");
            var newName = $(event.target).attr('value');
            this.model.updateMethodName(domData, newName);
        },

        changeMethodReturnType : function (event) {
            var domData = $(event.target).parent().parent().data("index");
            var newReturnType = $(event.target).attr('value');
            this.model.updateMethodReturnType(domData, newReturnType);
        },

        addMethod : function () {
            this.model.addMethod();
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

        deleteMember : function (event) {
            var index = $(event.target).parent().parent().data("index");
            this.model.deleteMember(index);
        },

        changeWidth : function (event) {
            var width = event.currentTarget.value;
            this.model.setWidth(width);
        },

        changeXCood : function (event) {
            this.model.setXCood(event.currentTarget.value)
        },

        getType : function () {
            return "ClassGuiController";
        }
    });
});