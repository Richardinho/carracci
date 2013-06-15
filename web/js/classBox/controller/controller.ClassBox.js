define(['ControllerDraggableElement', 'popUp'], function (ControllerDraggableElement, popUp) {

    return ControllerDraggableElement.extend({


        initialize : function (options) {

            ControllerDraggableElement.prototype.initialize.call(this, options);
            this.view.element.click(this._onClick, this)
        },

        _onStart : function () {
            this.model.set({ "startX" : this.model.get("xCood") }, { silent : true });
            this.model.set({ "startY" : this.model.get("yCood") }, { silent : true });
        },

        _onMove : function (dx, dy) {
            this.model.translate(dx, dy);
        },

        _onEnd : function () {

        },

        _onClick : function (event) {
            if((this.keyManager.U_KEY)) {
                this.globalController.boxRequest(this.model);
            } else if(this.keyManager.C_KEY) {
                popUp.show(this.model, event);
            }
        },

        getType : function () {
            return "ClassBoxController";
        }

    });

});




