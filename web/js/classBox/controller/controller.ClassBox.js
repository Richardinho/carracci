define(['ControllerDraggableElement'], function (ControllerDraggableElement) {

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
            this.model.set({ "xCood" : this.model.get("XMoved") }, { silent : true });
            this.model.set({ "yCood" : this.model.get("YMoved") }, { silent : true })
        },

        _onEnd : function () {
            this.model.set({"XMoved" : 0 }, { silent : true });
            this.model.set({"YMoved" : 0 }, { silent : true });
        },

        _onClick : function () {
            if((this.keyManager.U_KEY)) {
                this.globalController.boxRequest(this.model);
            }
        }

    });

});




