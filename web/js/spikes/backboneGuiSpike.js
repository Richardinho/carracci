Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {

    var fooProp, barMethod, blahMethod, builtObject;

    fooProp = Glenmorangie.stubData.PropertyBuilder()
        .name("foo")
        .visibility("public")
        .type("String")
        .build();

    barMethod = Glenmorangie.stubData.MethodBuilder()
        .name("bar")
        .visibility("protected")
        .returnType("List")
        .argument({name : "foo", type : "String" })
        .argument({name : "bar", type : "String" })
        .build();

    blahMethod = Glenmorangie.stubData.MethodBuilder()
        .name("blah")
        .visibility("protected")
        .returnType("List")
        .argument({name : "foo", type : "String" })
        .argument({name : "bar", type : "String" })
        .build();

    builtObject = Glenmorangie.stubData.ClassBuilder()
        .name("ArrayList")
        .extends("AbstractList")
        .implements("List")
        .implements("Collection")
        .property(fooProp)
        .method(barMethod)
        .method(blahMethod)
        .build();



    Glenmorangie.umlProject.umlClass = Backbone.Model.extend({

        addNewProperty : function () {
            var newProperty = Glenmorangie.stubData.PropertyBuilder()
                .name("")
                .build();

            var properties = this.get("properties");
            properties.push(newProperty);
            this.set("properties", properties);
            this.trigger("change");

        },

        addNewMethod : function () {

            var newMethod = Glenmorangie.stubData.MethodBuilder()
                .name("")
                .build();

            var methods = this.get("methods");
            methods.push(newMethod);
            this.set("methods", methods);
            this.trigger("change")
        },

        addNewArgument : function (methodId) {
            var methods = this.get("methods");
            var method = methods[methodId];
            var arg = {name : "foo", type : "String" };
            method.args.push(arg);
            this.set("methods", methods);
            this.trigger("change")
        },

        deleteArgument : function (methodId, argId) {
            var methods = this.get("methods");
            var method = methods[methodId];
            method.args.splice(argId, 1);
            this.trigger("change")

        },

        deleteMethod : function (methodId) {
            var methods = this.get("methods");
            methods.splice(methodId, 1);
            this.trigger("change");

        },


        deleteProperty : function (propertyId) {
            var properties = this.get("properties");
            properties.splice(propertyId, 1);
            this.trigger("change");

        }
    });


    var ClassCollection = Backbone.Collection.extend({
        model: Glenmorangie.umlProject.umlClass;
    });

    var classes = new ClassCollection();

    var umlClassModel = new Glenmorangie.umlProject.umlClass();

    umlClassModel.set(builtObject);
    umlClassModel.set("id", 3);

    classes.add(umlClassModel);







    Glenmorangie.umlProject.umlClassView = Backbone.View.extend({

        initialize : function () {

            this.model.bind('change', this.render, this);
        },

        template: _.template($('#gui-uml-class-template').html()),

        render : function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        addProperty : function (event) {
            this.model.addNewProperty();
        },

        deleteProperty : function (event) {
            var propertyId = Glenmorangie.utils.getPropertyIdFromClassMethodId($(event.target).attr('data-property-id'));
            this.model.deleteProperty(propertyId);
        },

        addMethod : function (event) {
            this.model.addNewMethod();
        },

        addArgument : function(event) {
            var methodId = Glenmorangie.utils.getMethodIdFromClassMethodId($(event.target).attr('data-method-id'));
            this.model.addNewArgument(methodId);
        },

        deleteArgument : function (event) {
            var methodId = Glenmorangie.utils.getMethodIdFromArgId($(event.target).attr('data-arg-id')),
                argId = Glenmorangie.utils.getArgIdFromArgId($(event.target).attr('data-arg-id'));

            this.model.deleteArgument(methodId, argId);
        },

        deleteMethod : function (event) {
            var methodId = Glenmorangie.utils.getMethodIdFromClassMethodId($(event.target).attr('data-method-id'));
            this.model.deleteMethod(methodId);
        },

        events : {
            "click .addProperty" : "addProperty",
            "click .delete-property" : "deleteProperty",
            "click .addMethod" : "addMethod",
            "click .addArgument" : "addArgument",
            "click .delete-arg" : "deleteArgument",
            "click .delete-method" : "deleteMethod"
        }
    });

    var umlClassView = new Glenmorangie.umlProject.umlClassView({ model : umlClassModel });

    $('#gui-container').html(umlClassView.render().el);
});