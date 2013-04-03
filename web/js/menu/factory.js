define(['MenuElementModel',
        'MenuElementView',
        'MenuElementController',
        'jQuery' ], function ( MenuElementModel,
                               MenuElementView,
                               MenuElementController,
                               $ ) {


    return function(config) {

        var items = config.items;

        var itemWidth = config.itemWidth;

        var dropDownContainer = config.dropDownEl;

        var el = config.el;

        $.each(items, function (index, item) {

            var menuModel = new MenuElementModel({
                name : item.name,
                items : item.subItems,
                index : index
            });

            var menuView = new MenuElementView({
                model : menuModel,
                menuEl : el,
                width : itemWidth,
                dropDownEl : dropDownContainer
            });

            var menuController = new MenuElementController({
                model : menuModel,
                view : menuView
            });
        });
    }
});