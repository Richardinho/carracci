Glenmorangie.namespace("Glenmorangie");

Glenmorangie.HorizontalArrowNode = Glenmorangie.ArrowNode.extend ({


    initialize : function (options) {

        Glenmorangie.ArrowNode.prototype.initialize.call(this, options);
    },

    setArrowDirection : function (x, y) {

        if ( this.getXCood() > x) {
            this.arrow.setArrowDirection("right");
        } else {
            this.arrow.setArrowDirection("left");
        }
    }

});