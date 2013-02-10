Glenmorangie.namespace("Glenmorangie.Controller");

Glenmorangie.Controller.ArrowNode = Glenmorangie.Controller.DraggableElement.extend({


    initialize : function (options) {

        Glenmorangie.Controller.DraggableElement.prototype.initialize.call(this, options);
        this.view.element.click(this._onClick, this)
    },

    _onClick : function () {
        if(this.keyManager.S_KEY) {
            console.log("click and  s key");
            this.model.changePointer();
        } else if(this.keyManager.T_KEY) {
            console.log("t key")
            this.model.changeLine();
        }
    }


});



