Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.ClassBox = Glenmorangie.Controller.DraggableElement.extend({


    initialize : function (options) {

        Glenmorangie.Controller.DraggableElement.prototype.initialize.call(this, options);
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



