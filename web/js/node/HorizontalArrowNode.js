Glenmorangie.namespace("Glenmorangie");

Glenmorangie.HorizontalArrowNode = Glenmorangie.ArrowNode.extend ({


    initialize : function (options) {

        Glenmorangie.ArrowNode.prototype.initialize.call(this, options);
    },

    setArrowDirection : function (x, y) {

        if ( this.getXCood() > x) {
            this.direction = "right";
            this.arrow.setDirection("right");
        } else {
            this.direction = "left";
            this.arrow.setDirection("left");
        }
        this.arrow.updatePath(this.xCood, this.yCood);
    },

    updateArrowState : function () {
        var proximalX = this.proximalNode.xCood;
        this.setArrowDirection(proximalX, null);
    }

});