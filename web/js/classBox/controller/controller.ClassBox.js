define(['ControllerDraggableElement'], function (ControllerDraggableElement) {

    return ControllerDraggableElement.extend({


        initialize : function (options) {

            ControllerDraggableElement.prototype.initialize.call(this, options);
            this.view.element.click(this._onClick, this)

        },

        _onStart : function () {
            this.startX = parseInt(this.view.element.attr("x"));
            this.startY = parseInt(this.view.element.attr("y"));
        },

        _onClick : function () {
            if((this.keyManager.U_KEY)) {
                this.globalController.boxRequest(this.model);
            }
        }

    });

});




