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
        .returnType("ListFoo")
        .argument({name : "foo", type : "String" })
        .argument({name : "bar", type : "String" })
        .build();

    blahMethod = Glenmorangie.stubData.MethodBuilder()
        .name("blah")
        .visibility("protected")
        .returnType("ArrayList")
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
            "change .gui-uml-class-name" : "updateClassName",
            "change .gui-uml-class-parent" : "updateClassParent",
            "click .gui-add-interface" : "addInterface",
            "click .gui-add-property" : "addProperty",
            "click .gui-add-method" : "addMethod",
            "click .gui-delete-property" : "deleteProperty",
            "click .gui-delete-method" : "deleteMethod",
            "click .gui-delete-arg" : "deleteArgument",
            "click .gui-delete-interface" : "deleteInterface",
            "change .gui-uml-class-interface input" : "updateInterface",
            "change .gui-property-name input" : "updatePropertyName",
            "change .gui-method-name input" : "updateMethodName",
            "change .gui-property-type input" : "updatePropertyType",
            "change .gui-method-return-type input" : "updateMethodReturnType",
            "change .gui-visibility-buttons input" : "updateVisibility",
            "change .gui-method-visibility-buttons input" : "updateMethodVisibility",
            "change .gui-arg-name" : "updateArgName",
            "change .gui-arg-type" : "updateArgType",
            "click .gui-add-argument" : "addArgument"

        },

        updateClassName : function (event) {
            this._getUmlClassObj().name = $(event.target).val();
            this.model.trigger("change:class");
        },

        updateClassParent : function (event) {
            this._getUmlClassObj().parent = $(event.target).val();
            this.model.trigger("change:class");
        },

        addInterface : function () {

            var umlClass = this._getUmlClassObj();
            umlClass.interfaces.push("");
            this.render();
            this.model.trigger("change:class");
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

        addArgument : function (event) {
            var methodIndex = this._getDataMethodIndex(event);
            this._getMethod(methodIndex).args.push(Glenmorangie.stubData.MethodArgBuilder().build());
            this.render();
            this.model.trigger("change:class");
        },

        updateInterface : function (event) {
            var interfaceIndex = this._getDataInterfaceIndex(event);
            this._getUmlClassObj().interfaces[interfaceIndex] = $(event.target).val();
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

        updateArgName : function (event) {
            this._updateArgMember(event, "name");
            this.model.trigger("change:class");
        },

        updateArgType : function (event) {
            this._updateArgMember(event, "type");
            this.model.trigger("change:class");
        },

        updatePropertyType : function (event) {
            this._updatePropertyMember(event, "type");
            this.model.trigger("change:class");
        },

        updateMethodReturnType : function (event) {
            this._updateMethodMember(event, "returnType");
            this.model.trigger("change:class");
        },

        updateVisibility : function (event) {

           var propertyIndex = this._getDataPropertyIndex(event);
           this._getProperty(propertyIndex)['visibility'] = $(event.target).attr("data-visibility");
           this.model.trigger("change:class");
        },

        updateMethodVisibility : function (event) {
           var methodIndex = this._getDataMethodIndex(event);
           this._getMethod(methodIndex)['visibility'] = $(event.target).attr("data-visibility");
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

        deleteInterface : function (event) {
            var interfaceIndex = this._getDataInterfaceIndex(event);
            this._getUmlClassObj().interfaces.splice(interfaceIndex, 1);
            this.render();
            this.model.trigger("change:class");
        },

        deleteArgument : function (event) {
            var methodIndex = this._getDataMethodIndex(event);
            var argIndex = this._getDataArgIndex(event);
            this._getUmlClassObj().methods[methodIndex].args.splice(argIndex, 1);
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

        _updateArgMember : function (event, member) {
            var methodIndex = this._getDataMethodIndex(event),
                argIndex = this._getDataArgIndex(event);
            this._getUmlClassObj().methods[methodIndex].args[argIndex][member] = $(event.target).val();
        },

        _getDataPropertyIndex : function (event) {
            return $(event.target).attr("data-property-index");;
        },

        _getDataMethodIndex : function (event) {
            return $(event.target).attr("data-method-index");;
        },

        _getDataArgIndex : function (event) {
            return $(event.target).attr("data-arg-index");;
        },

        _getDataInterfaceIndex : function (event) {
            return $(event.target).attr("data-interface-index");;
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
        classModel.set("position", { x : 100, y : 150 });


        var $element = $('<div>');
        $('#uml-classes').append($element);

        Glenmorangie.umlProject.umlClassViews["uml-class-" + classes[i].id] = Glenmorangie.UmlViewFactory.createView({ el : $element, "model" : classModel });

        var $guiElement = $('<div>');
        $('#gui-uml-classes').append($guiElement);
        Glenmorangie.umlProject.guiUmlClassViews[classes[i].id] = new Glenmorangie.umlProject.GuiView({ el : $guiElement, "model" : classModel });

    }

});