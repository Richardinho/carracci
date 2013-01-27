Glenmorangie.namespace("Glenmorangie");

Glenmorangie.Arrow = Glenmorangie.utils.extend({

    arrowHeads : [],

    current : 0,

    initialize : function (options) {
        this.svgUtils = options.svgUtils;
        this.arrowHeads = this._initializeArrowHeads(options.direction);
    },

    setArrowDirection : function(direction) {
        this.arrowHeads[this.current].setDirection(direction);
    },

    updateArrowHead : function (x, y) {
        this.arrowHeads[this.current].update(x, y);
    },

    changeArrowHead : function () {
        this.current = (this.current + 1) % this.arrowHeads.length;
    },

    _initializeArrowHeads : function (direction) {
        return  [ this.svgUtils.createArrow(x, y, direction),
                  this.svgUtils.createDiamond( x, y, "black", direction),
                  this.svgUtils.createExtendsArrow( x, y, "black", direction),
                  this.svgUtils.createExtendsArrow( x, y, "white", direction),
                  this.svgUtils.createNullElement( x, y, direction ) ];
    }
});