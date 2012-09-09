$(document).ready(function () {


    Glenmorangie.umlProject.GuiUmlClassesView = Backbone.View.extend({


        initialize : function () {

            _.bindAll(this, "renderClasses");
            this.model.on("change:classes", this.renderClasses);
            this.renderClasses();
        },

        template : _.template($('#gui-uml-classes-template').html()),


        renderClasses : function () {
            var html = this.template({ "classes" : this.model.get("classes") });
            this.$el.html(html);
        },

        addMethod : function (event) {
            var classId = Glenmorangie.utils.getClassId(event);
            this.model.addNewMethod(classId);
        },

        deleteMethod : function (event) {
            var classId = Glenmorangie.utils.getClassId(event),
                methodId = Glenmorangie.utils.getMethodId(event);
            this.model.deleteMethod(classId, methodId);
        },

        addArgument : function (event) {
            var classId = Glenmorangie.utils.getClassId(event)
                methodId = Glenmorangie.utils.getMethodId(event);
            this.model.addNewArgument(classId, methodId);
        },

        deleteArgument : function (event) {
            var classId = Glenmorangie.utils.getClassId(event),
                methodId = Glenmorangie.utils.getMethodId(event),
                argId = Glenmorangie.utils.getArgumentId(event);
            this.model.deleteArgument(classId, methodId, argId);
        },

        addProperty : function (event) {
            var classId = Glenmorangie.utils.getClassId(event);
            this.model.addNewProperty(classId);
        },

        deleteProperty : function (event) {
            var classId = Glenmorangie.utils.getClassId(event),
                propertyId = Glenmorangie.utils.getPropertyId(event);
            this.model.deleteProperty(classId, propertyId);
        },

        events : {
            "click .gui-add-method" : "addMethod",
            "click .gui-delete-method" : "deleteMethod",
            "click .gui-add-argument" : "addArgument",
            "click .gui-delete-arg" : "deleteArgument",
            "click .gui-add-property" : "addProperty",
            "click .gui-delete-property" : "deleteProperty"
        }

    });

});

