Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.ArrowNode = Glenmorangie.Controller.DraggableElement.extend({


    initialize : function (options) {

        Glenmorangie.Controller.DraggableElement.prototype.initialize.call(this, options);
        this.view.element.click(this._onClick, this)
    },

    _onClick : function () {
        if(this.keyManager.S_KEY) {
            this.model.changePointer();
        } else if(this.keyManager.T_KEY) {
            this.model.changeLine();
        } else if(this.keyManager.U_KEY) {
            this.globalController.arrowRequest(this.model);

        }
    },

    removeFrom : function (boxModel) {

    }


});


