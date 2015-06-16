define([
    "BaseType",
    "diagram/connectors/editorView"

    ],

    function (
        BaseType,
        ConnectorEditorView
    ) {

    "use strict";


    return BaseType.extend({

        initialize : function (options) {

            this.manager = options.manager;
            this.diagramController = options.diagramController;

            this.view = new ConnectorEditorView({
                el : $('#connector-editor')
            });

            this.view.$el.on("click", "[data-role=cancel]", $.proxy(this.close, this));
            this.view.$el.on("click", "[data-role=delete]", $.proxy(this.del, this));

        },

        /*
            open up editor module
        */
        show : function ( stackIndex, connectorModel ) {

            this.model = connectorModel;

            this.view.model = this.model;

            this.view.render(stackIndex);

        },

        close : function () {

            this.manager.onCloseWidget();
            this.view.hide();

        },

        del : function () {

            this.diagramController.deleteConnector(this.model.id);
            this.model.trigger("destroy");
            this.close();
        }
    });
});

