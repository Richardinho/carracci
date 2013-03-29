define(['BaseType', 'underscore', 'jQuery'], function (BaseType, _, $) {


    return BaseType.extend({


        initialize : function (options) {

        _.bindAll(this, "changeWidth", "changeXCood", "handleVisibilityClick",
        "addProperty", "changeMethodReturnType", "changeClassName", "deleteMember",
        "changePropertyName", "changePropertyType", "addMethod", "changeMethodName",
        "handleMethodVisibilityClick", "deleteMethod", "addArgument", "deleteArgument",
        "updateArgumentName", "updateArgumentType");

            this.model = options.model;
            this.view = options.view;
            $('input[name=xCood]').on('change', this.changeXCood);
            var classId = this.model.id;
            $('.' + classId).find('.addProperty input').live("click", this.addProperty);
            $('.' + classId).find('.addMethod input').live("click", this.addMethod);
            $('.' + classId).find('.changeClassName  input').live("change", this.changeClassName);
            $('.' + classId).find('.visibility').live("click", this.handleVisibilityClick);
            $('.' + classId).find('.methodVisibility').live("click", this.handleMethodVisibilityClick);
            $('.' + classId).find('.addArgButton input').live("click", this.addArgument);



            $('.' + classId).find('.delete input').live("click", this.deleteMember);
            $('.' + classId).find('.deleteMethod input').live("click", this.deleteMethod);
            $('.' + classId).find('.property .name input').live("change", this.changePropertyName);
            $('.' + classId).find('.method .name input').live("change", this.changeMethodName);
            $('.' + classId).find('.method .returnType input').live("change", this.changeMethodReturnType);

            $('.' + classId).find('.method .arguments .arg-body .del').live("click", this.deleteArgument);

            $('.' + classId).find('.method .arguments .arg-body .name').live("change", this.updateArgumentName);
            $('.' + classId).find('.method .arguments .arg-body .type').live("change", this.updateArgumentType);




            $('.' + classId).find('.property .type input').live("change", this.changePropertyType);
        },

        handleVisibilityClick : function (event) {
            var index = $(event.target).parent().data("index");
            this.model.updateVisibility(index);
        },

        handleMethodVisibilityClick : function (event) {
            var index = $(event.target).parent().parent().data("index");
            this.model.updateVisibility(index);
        },

        addArgument : function (event) {
            var data = $(event.target).parent().parent().parent().data('index');
            this.model.addArgument(data);
        },

        deleteArgument : function (event) {
            var data = $(event.target).parent().data('index');
            this.model.deleteArgument(data);
        },

        updateArgumentName : function (event) {
            var data = $(event.target).parent().data('index');
            var name = $(event.target).val();
            this.model.updateArgumentName(data, name);
        },

        updateArgumentType : function (event) {
            var data = $(event.target).parent().data('index');
            var type = $(event.target).val();
            this.model.updateArgumentType(data, type);
        },

        addProperty : function () {
            this.model.addProperty();
        },

        changeMethodName : function (event) {
            var domData = $(event.target).parent().parent().parent().data("index");
            var newName = $(event.target).attr('value');
            this.model.updateMethodName(domData, newName);
        },

        changeMethodReturnType : function (event) {
            var domData = $(event.target).parent().parent().parent().data("index");
            var newReturnType = $(event.target).attr('value');
            this.model.updateMethodReturnType(domData, newReturnType);
        },

        addMethod : function () {
            this.model.addMethod();
        },

        changeClassName : function (event) {
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

        deleteMethod : function (event) {
            var index = $(event.target).parent().parent().parent().data("index");
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