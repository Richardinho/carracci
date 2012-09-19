Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {




    var fooProp, barMethod, blahMethod, builtObject1, builtObject2;

    fooProp = Glenmorangie.stubData.PropertyBuilder()
        .name("foobar")
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

    builtObject1 = Glenmorangie.stubData.ClassBuilder()
        .name("ArrayList")
        .extends("AbstractList")
        .implements("List")
        .implements("Collection")
        .property(fooProp)
        .method(barMethod)
        .id("foobar")
        .x(150)
        .y(150)
        .build();

    builtObject2 = Glenmorangie.stubData.ClassBuilder()
        .name("ArrayList")
        .extends("AbstractList")
        .implements("List")
        .implements("Collection")
        .property(fooProp)
        .method(blahMethod)
        .id("blah")
        .x(100)
        .y(100)
        .build();

    var classes = [ builtObject1];
    Glenmorangie.umlProject.umlClassViews = {};
    Glenmorangie.umlProject.guiUmlClassViews = {};

    Glenmorangie.umlProject.GuiView = Backbone.View.extend({

        initialize : function () {
            this.render();

        },

        events : {
            "click .gui-add-property" : "addProperty",
            "click .gui-add-method" : "addMethod",
            "click .gui-delete-property" : "deleteProperty",
            "click .gui-delete-method" : "deleteMethod",
            "change .gui-property-name input" : "updatePropertyName",
            "change .gui-method-name input" : "updateMethodName",
            "change .gui-property-type input" : "updatePropertyType",
            "change .gui-visibility-buttons input" : "updateVisibility"

        },

        addProperty : function () {
            var umlClass = this._getUmlClassObj();
            umlClass.properties.push(Glenmorangie.stubData.PropertyBuilder().build());
            this.render();
            this.model.trigger("change:class");
        },

        addMethod : function () {
            var umlClass = this._getUmlClassObj();
            umlClass.methods.push(Glenmorangie.stubData.MethodBuilder().build());
            this.render();
            this.model.trigger("change:class");
        },

        updatePropertyName : function (event) {
            this._updatePropertyMember(event, "name");
            this.model.trigger("change:class");
        },

        updateMethodName : function (event) {
            this._updateMethodMember(event, "name");
            this.model.trigger("change:class");
        },

        updatePropertyType : function (event) {
            this._updatePropertyMember(event, "type");
            this.model.trigger("change:class");
        },

        updateVisibility : function (event) {
           var propertyIndex = this._getDataPropertyIndex(event);
           this._getProperty(propertyIndex)['visibility'] = $(event.target).attr("data-visibility");
           this.model.trigger("change:class");
        },

        deleteProperty : function (event) {
            var propertyIndex = $(event.target).attr("data-property-id");
            this._getUmlClassObj().properties.splice(propertyIndex, 1);
            this.render();
            this.model.trigger("change:class");
        },

        deleteMethod : function (event) {
            var methodIndex = $(event.target).attr("data-property-id");
            this._getUmlClassObj().methods.splice(methodIndex, 1);
            this.render();
            this.model.trigger("change:class");
        },

        template : _.template($('#gui-uml-classes-template').html()),

        render : function () {

            var html = this.template({ "class" : this._getUmlClassObj() });
            this.$el.html(html);
        },

        _updatePropertyMember : function (event, member) {
            var propertyIndex = this._getDataPropertyIndex(event);
            this._getProperty(propertyIndex)[member] = $(event.target).val();
        },

        _updateMethodMember : function (event, member) {
            var methodIndex = this._getDataMethodIndex(event);
            this._getMethod(methodIndex)[member] = $(event.target).val();
        },

        _getDataPropertyIndex : function (event) {
            return $(event.target).attr("data-property-index");;
        },

        _getDataMethodIndex : function (event) {
            return $(event.target).attr("data-method-index");;
        },

        _getProperty : function (index) {
            return this._getUmlClassObj().properties[index];
        },

        _getMethod : function (index) {
            return this._getUmlClassObj().methods[index];
        },

        _getUmlClassObj : function () {
            return this.model.get("class");
        }

    });

    for ( var i = 0 ; i < classes.length; i++)  {

        var classModel = new Glenmorangie.umlProject.umlClassModel();
        classModel.set("class", classes[i]);



        var $element = $('<div>');
        $('#uml-classes').append($element);
        Glenmorangie.umlProject.umlClassViews[classes[i].id] = new Glenmorangie.umlProject.UmlClassView({ el : $element, "model" : classModel });


        var $guiElement = $('<div>');
        $('#gui-uml-classes').append($guiElement);
        Glenmorangie.umlProject.guiUmlClassViews[classes[i].id] = new Glenmorangie.umlProject.GuiView({ el : $guiElement, "model" : classModel });

    }






});