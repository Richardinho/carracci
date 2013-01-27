Glenmorangie.namespace("Glenmorangie");

Glenmorangie.SvgElement = Glenmorangie.Element.extend({

    initialize : function (options) {

        Glenmorangie.Element.prototype.initialize.call(this, options);

        this.element = options.svg.createCircle(options.x, options.y);
    },

    render : function() {
        this.element.attr({ "cx" : this.xCood });
        this.element.attr({ "cy" : this.yCood });
        this.element.toFront();
    },

    moveInYAxis : function (x, y) {
        this.updateCoordinates(this.getXCood(), y);
    },

    moveInXAxis : function (x, y) {
        this.updateCoordinates(x, this.getYCood());
    }


});


