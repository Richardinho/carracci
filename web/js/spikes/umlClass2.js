Glenmorangie.namespace("Glenmorangie.umlProject");

$(document).ready(function () {

var umlClassModel = {},
    argObj,
    fooProp,
    barMethod,
    builtObject;



    argObj = Glenmorangie.stubData.MethodArgBuilder()
        .name("hello")
        .type("Integer")
        .build();

    fooProp = Glenmorangie.stubData.PropertyBuilder()
        .name("foo")
        .visibility("public")
        .type("String")
        .build();

    barMethod = Glenmorangie.stubData.MethodBuilder()
        .name("bar")
        .visibility("protected")
        .returnType("List")
        .argument(argObj)
        .build();

    builtObject = Glenmorangie.stubData.ClassBuilder()
        .name("ArrayList")
        .extends("AbstractList")
        .implements("List")
        .implements("Collection")
        .property(fooProp)
        .property(fooProp)
        .method(barMethod)
        .method(barMethod)
        .build();



 umlClassBox($('#foo'), builtObject);

function umlClassBox(element, model) {
    var umlModel = model,
        $element = element,
        $rect;

    $rect = $('<div>');
    $rect.addClass("umlClass");
    $element.append($rect);


    appendElementToContainer(nameBox(Glenmorangie.formatters.formatClassName(umlModel)), $rect);

    var $propContainer = $('<div>');
    $propContainer.addClass('properties')
    for (var i= 0; i < umlModel.properties.length; i++) {
        appendElementToContainer(propBox(Glenmorangie.formatters.formatProperty(umlModel.properties[i])), $propContainer);
    }
    appendElementToContainer($propContainer, $rect);

    var $methodContainer = $('<div>');
    $methodContainer.addClass('methods');
    for (var i= 0; i < umlModel.methods.length; i++) {
        appendElementToContainer(methodBox(Glenmorangie.formatters.formatMethod(umlModel.methods[i])), $methodContainer);
    }
    appendElementToContainer($methodContainer, $rect);

    function appendElementToContainer(element, container) {
        container.append(element);
    }

    function nameBox(name) {

        $nameBox = $('<div>');
        $nameBox.text(name);
        $nameBox.addClass('nameBox');
        return $nameBox;
    }

    function propBox(prop)  {

        $propBox = $('<div>');
        $propBox.text(prop);
        $propBox.addClass('property');
        return $propBox;
    }

    function methodBox(method)  {

        $methodBox = $('<div>');
        $methodBox.text(method);
        $methodBox.addClass('method');
        return $methodBox;
    }



    return {

    }
}






});