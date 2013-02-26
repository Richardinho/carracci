
define(['ClassBoxModel',
        'propertyBuilder',
        'ClassBoxView',
        'ClassBoxController',
        'GuiView',
        'GuiController'], function (ClassBoxModel,
                                    propertyBuilder,
                                    ClassBoxView,
                                    ClassBoxController,
                                    GuiView,
                                    GuiController) {

    var classNumber = 0;

    return function(options) {

        var classBoxModel,
            property,
            property2,
            classBoxView,
            classBoxController,
            guiView,
            gui,
            containerElement;

        var id = "class" + classNumber++;

        containerElement = $('#class-container');

        classBoxModel = new ClassBoxModel({ "id" : id, x : options.x, y : options.y, width : options.width, height : options.height });

        property = propertyBuilder('foo').visibility("-").type("String").build();
        property2 = propertyBuilder('bar').visibility("#").type("float").build();

        classBoxModel.addProperty(property);
        classBoxModel.addProperty(property2);

        classBoxView = new ClassBoxView({ model : classBoxModel });
        classBoxController = new ClassBoxController({ model : classBoxModel, view : classBoxView });

        guiView = new GuiView({ model : classBoxModel , containerEl : containerElement });

        gui = new GuiController({ model : classBoxModel , view : guiView });

        return classBoxModel;
    }

});

