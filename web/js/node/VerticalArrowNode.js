Glenmorangie.namespace("Glenmorangie");

Glenmorangie.VerticalArrowNode = Glenmorangie.ArrowNode.extend ({


    initialize : function (options) {

        Glenmorangie.ArrowNode.prototype.initialize.call(this, options);
    },

    setArrowDirection : function (x, y) {

        if ( this.getYCood() > y) {
            this.arrow.setArrowDirection("down");
        } else {
            this.arrow.setArrowDirection("up");
        }
    }

});