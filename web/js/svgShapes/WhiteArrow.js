Glenmorangie.namespace("Glenmorangie");

Glenmorangie.WhiteArrow = Glenmorangie.utils.extend({

    svgShape: null,

    tip : null,

    centre : null,

    right : null,

    left : null,

    direction : null,

    initialize : function (options) {

        this.svgUtils = options.svgUtils;
        this.direction = options.direction;

        this.svgShape = this._createSvgShape(options.x, options.y, "white");
    },

    _createSvgShape : function (x, y, color) {

        return this.svgUtils.createPath(this._getPath(x, y), color);
    },

    _changeShapeLocation : function (x, y) {
        this.svgUtils.resetPath(this.svgShape, this._getPath(x, y));
    },

    _getPath : function (x, y) {
        this._calculatePoints(x, y);
        return this.svgUtils.buildPath(this._getPointsArray(), true);
    },

    _transformShape : function (direction) {

    },

    _getPointsArray : function () {

        return [this.tip, this.right, this.left];
    },

    _calculatePoints : function (x, y) {

        this.centre = this._getPoint(x, y);

        switch(this.direction) {

        case "up" :
            this.tip = this._getPoint(x, y - 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
        break;

        case "down" :
            this.tip = this._getPoint(x, y + 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
        break;

        case "left" :
            this.tip = this._getPoint(x - 15, y);
            this.right = this._getPoint(x, y - 10);
            this.left = this._getPoint(x, y + 10);
        break;

        case "right" :
            this.tip = this._getPoint(x + 15, y);
            this.right = this._getPoint(x, y + 10);
            this.left = this._getPoint(x, y - 10);
        break;
        }
    },

    _getPoint : function (x, y) {
        return { "x" : x, "y" : y };
    }

});