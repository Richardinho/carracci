define([
    "BaseType",
    "diagram/json/jsonViewerView"

    ],

    function (
        BaseType,
        View
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.view = new View({

            });

            this.manager = options.manager;

            this.view.$el.on("click", "[data-role=close]", $.proxy(this.close, this));


        },

        show : function (stackingOrder, model) {

            this.model = model;

            this.view.show(stackingOrder, model);

        },

        close : function () {

            this.manager.onCloseWidget();
            this.view.hide();
        }


    });
});

