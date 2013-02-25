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
        'ToolsController'], function ( Model,
                                 View,
                                 HelpModel,
                                 helpData,
                                 HelpView,
                                 Foo,
                                 $ ,
                                 HelpController,
                                 ToolsModel,
                                 ToolsView,
                                 ToolsController ) {

    return function() {

        var helpModel = new HelpModel({ 'data' : helpData });
        var helpView = new HelpView({ model : helpModel, el : $('#help') });
        var helpController = new HelpController({ model : helpModel, view : helpView });

        var toolsModel = new ToolsModel();
        var toolsView = new ToolsView({ model : toolsModel, el : $('#tool-bar') });
        var toolsController = new ToolsController({ model : toolsModel, view : toolsView });

        var menuModel = new Model({ helpPage : helpModel, tools : toolsModel });
        var menuView = new View({ el : $('#menu') });
        var MenuController = new Foo({ "model" : menuModel, "view" : menuView });
    }
});