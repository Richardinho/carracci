define(['ToolBoxModel',
        'ToolBoxView',
        'ToolBoxController' ], function ( ToolBoxModel,
                                          ToolBoxView,
                                          ToolBoxController ) {

    return function(config) {

        var model = new ToolBoxModel(config.buttons);

        var view = new ToolBoxView({
            model : model,
            el : config.el
        });

        new ToolBoxController({
            model : model,
            view : view
        });
    }
});