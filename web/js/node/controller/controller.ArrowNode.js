define(['ControllerDraggableElement',
        'keyManager',
        'globalController',
        'deletePopUp'], function ( ControllerDraggableElement,
                                   KeyManager,
                                   globalController,
                                   deletePopUp) {

    return ControllerDraggableElement.extend({

        initialize : function (options) {

            ControllerDraggableElement.prototype.initialize.call(this, options);
            this.view.element.click(this._onClick, this)
        },

        _onClick : function (event) {
            if(KeyManager.S_KEY) {
                this.model.changePointer();
            } else if(KeyManager.T_KEY) {
                this.model.changeLine();
            } else if(KeyManager.U_KEY) {
                if(this.model.get("connectedToBox")) {
                    this.removeFrom();
                } else {
                    globalController.arrowRequest(this.model);
                }
            } else if(KeyManager.D_KEY) {
                this.showDeleteConnectorPopUp(event);
            }
        },

        removeFrom : function (boxModel) {
            this.model.detatch();
        },

        showDeleteConnectorPopUp : function (event) {
            deletePopUp.show(this, event);
        },

        getComponentId : function () {
            return this.model.componentId;
        },

        getType : function () {
            return this.model.name + "ArrowNodeController";
        }
    });
});




