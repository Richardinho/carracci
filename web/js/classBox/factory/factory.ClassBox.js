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

    return function(options) {

        var classBoxModel,
            property,
            property2,
            classBoxView,
            classBoxController,
            guiView,
            gui,
            containerElement;

        containerElement = $('#class-container');

        classBoxModel = new ClassBoxModel({ x : options.x, y : options.y, width : options.width, height : options.height });

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

