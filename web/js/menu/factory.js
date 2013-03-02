define(['MenuModel',
        'MenuView',
        'HelpModel',
        'helpData',
        'HelpView',
        'foo',
        'jQuery',
        'HelpController',
        'ToolsModel',
        'ToolsView',
        'ToolsController',
        'ControllerDraggableElement',
        'ModelElement' ], function ( Model,
                                 View,
                                 HelpModel,
                                 helpData,
                                 HelpView,
                                 Foo,
                                 $ ,
                                 HelpController,
                                 ToolsModel,
                                 ToolsView,
                                 ToolsController,
                                 DraggableElementController,
                                 ModelElement) {



    return function() {

        var helpModel,
            helpView,
            helpController,
            toolsModel,
            toolsView,
            toolsController,
            menuModel,
            menuView,
            menuController;

        helpModel = new HelpModel({ 'data' : helpData });
        helpView = new HelpView({ model : helpModel, el : $('#help') });
        helpController = new HelpController({ model : helpModel, view : helpView });

//        var helpContainerModel = new ModelElement();
//        var helpContainerView = new HelpContainerView({ model : helpContainerModel });
//        var helpContainerController = new DraggableElementController({ model : helpContainerModel,
//                                                                       view : helpContainerView });

        toolsModel = new ToolsModel();
        toolsView = new ToolsView({ model : toolsModel, el : $('#tool-bar') });
        toolsController = new ToolsController({ model : toolsModel, view : toolsView });

        menuModel = new Model({ helpPage : helpModel, tools : toolsModel });
        menuView = new View({ el : $('#menu') });
        MenuController = new Foo({ "model" : menuModel, "view" : menuView });
    }
});