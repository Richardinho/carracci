Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ArrowShape = Glenmorangie.utils.extend({

    svgShape : null,

    tip : null,

    centre : null,

    initialize : function (options) {
        this.svgShape = _createSvgShape();
    },

    update : function (x, y) {

        this._changeShapeLocation(x, y);
    },

    setDirection : function (direction) {

        this._transformShape(direction);
    },

    _createSvgShape : function () {

    },

    _changeShapeLocation : function () {

    },

    _transformShape : function (direction) {

    }


});