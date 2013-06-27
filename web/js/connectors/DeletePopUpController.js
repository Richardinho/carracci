define(['BaseType', 'componentContainer'], function ( BaseType, componentContainer ) {


    return BaseType.extend({

        initialize : function (options) {
           // _.bindAll(this, "cancel", "deleteConnector");
           // this.view = options.view;
           // this.componentContainer = componentContainer;

           // this.currentConnectorController = null;
           // this.view.getDeleteButton().on("click", this.deleteConnector);
           // this.view.getCancelButton().on("click", this.cancel);
        },

        show : function (controller, event) {
            this.view.show(event.x, event.y);
            this.currentConnectorController = controller;
        },

        hide : function () {
            this.view.hide();
        },

        deleteConnector : function () {

            var componentId = this.currentConnectorController.getComponentId()

            var components = this.componentContainer.getComponent(componentId);

            for(var component in components) {
                if (components[component]['destroy']) {
                    components[component]['destroy'].call();
                }
            }
            this.componentContainer.removeComponent(componentId);

            this.currentConnectorController = null;
            this.hide();
        },

        cancel : function () {
            this.currentConnectorController = null;
            this.hide();
        }
    });
});