Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {




    var fooProp, barMethod, blahMethod, builtObject1, builtObject2;

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

    var classes = [ builtObject1, builtObject2];
    Glenmorangie.umlProject.umlClassViews = {};
    Glenmorangie.umlProject.guiUmlClassViews = {};

    Glenmorangie.umlProject.GuiView = Backbone.View.extend({

        initialize : function () {
            this.render();

        },

        events : {
            "click .gui-add-property" : "addProperty"

        },

        addProperty : function () {
            var umlClass = this._getUmlClassObj();
            umlClass.properties.push(Glenmorangie.stubData.PropertyBuilder().build());
            this.render();
        },

        template : _.template($('#gui-uml-classes-template').html()),

        render : function () {

            var html = this.template({ "class" : this._getUmlClassObj() });
            this.$el.html(html);
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