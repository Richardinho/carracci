Glenmorangie.namespace("Glenmorangie");

Glenmorangie.WhiteDiamond = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.svgUtils = options.svgUtils;
        this.direction = "right";
        this.path = this._getPath(options.x, options.y);
        this.svgShape = this._createSvgShape("black");
    },

    render : function () {
        this.svgUtils.resetPath(this.svgShape, this.path);
    },

    _createSvgShape : function (color) {
        return this.svgUtils.createPath(this.path, color);
    },

    setDirection : function (direction) {
        this.direction  = direction;
        this._calculatePoints();
    },

    updatePath : function (x, y) {
        this.path = this._getPath(x, y);
    },

    _getPath : function (x, y) {
        this._calculatePoints(x, y);
        return this.svgUtils.buildPath(this._getPointsArray(), true);
    },

    _transformShape : function (direction) {

    },

    _getPointsArray : function () {

        return [this.tip, this.right, this.bottom, this.left];
    },

    _calculatePoints : function (x, y) {
        var x = parseInt(x, 10);
        var y = parseInt(y, 10);

        this.centre = this._getPoint(x, y);

        switch(this.direction) {

        case "up" :
            this.tip = this._getPoint(x, y - 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
            this.bottom = this._getPoint(x, y + 10);
        break;

        case "down" :
            this.tip = this._getPoint(x, y + 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
            this.bottom = this._getPoint(x, y - 10);
        break;

        case "left" :
            this.tip = this._getPoint(x - 15, y);
            this.right = this._getPoint(x, y - 10);
            this.left = this._getPoint(x, y + 10);
            this.bottom = this._getPoint(x + 10, y);
        break;

        case "right" :
            this.tip = this._getPoint(x + 15, y);
            this.right = this._getPoint(x, y + 10);
            this.left = this._getPoint(x, y - 10);
            this.bottom = this._getPoint(x - 10, y);
        break;
        }
    },

    _getPoint : function (x, y) {
        return { "x" : x, "y" : y };
    }

});