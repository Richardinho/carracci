Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.View.Pointer = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.svgUtils = options.svgUtils;
        this.model = options.model;
        var path = this._buildPath(this.model._getPointsArray());
        this.svgShape = this._createSvgShape(path, this.model.get("color"));

        this.model.on("change", this.render, this);
    },

    _createSvgShape : function (path, color) {
        console.log("create shape", path)
        return this.svgUtils.createPath(path, color);
    },

    render : function () {
        this.svgUtils.resetPath(this.svgShape, this._buildPath(this.model._getPointsArray()));
        this.svgUtils.setShapeOpacity(this.svgShape, this.model.get("opacity"));
    },

    _buildPath : function (pointsArray) {
        return this.model.get('svgUtils').buildPath(pointsArray, true);
    }


});