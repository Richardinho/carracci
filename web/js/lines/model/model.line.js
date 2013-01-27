Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Line = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.svgUtils = options.svgUtils;
        this.nodeA = options.nodeA;
        this.nodeB = options.nodeB;
        this.updateLine();
    },

    updateLine : function () {

        var a = this._getPoint(this.nodeA);
        var b = this._getPoint(this.nodeB);
        this._updatePath(a, b);
    },

    _updatePath : function (a, b) {
        this.path = this.svgUtils.buildPath(this._getPointsArray(a, b), false);
    },

    _getPointsArray : function (a, b) {
        return [a, b ];
    },

    _getPoint : function (nodeModel) {
        return { "x" : nodeModel.xCood, "y" : nodeModel.yCood };
    }
});