define(['ControllerDraggableElement'], function (ControllerDraggableElement) {

    return ControllerDraggableElement.extend({


        initialize : function (options) {

            ControllerDraggableElement.prototype.initialize.call(this, options);
            this.view.element.click(this._onClick, this)

        },

        _onStart : function () {

        },

        _onMove : function (dx, dy) {
            this.model.translate(dx, dy);
        },

        _onEnd : function () {
            this.model.set({ "xCood" : this.model.get("tempX") });
            this.model.set({ "yCood" : this.model.get("tempY") })
        },

        _onClick : function () {
            if((this.keyManager.U_KEY)) {
                this.globalController.boxRequest(this.model);
            }
        }

    });

});




