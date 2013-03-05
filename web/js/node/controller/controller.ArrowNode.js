define(['ControllerDraggableElement', 'keyManager', 'globalController'], function (ControllerDraggableElement, KeyManager, globalController) {

    return ControllerDraggableElement.extend({


        initialize : function (options) {

            ControllerDraggableElement.prototype.initialize.call(this, options);
            this.view.element.click(this._onClick, this)
        },

        _onClick : function () {
            console.log("clicked on element");
            if(KeyManager.S_KEY) {
                this.model.changePointer();
            } else if(KeyManager.T_KEY) {
                this.model.changeLine();
            } else if(KeyManager.U_KEY) {
                console.log("UKey")
                if(this.model.get("connectedToBox")) {
                    console.log("disconnect")
                    this.model.set({ "connectedToBox" : false });
                } else {
                    globalController.arrowRequest(this.model);
                }

            }
        },

        removeFrom : function (boxModel) {

        }

    });

});




