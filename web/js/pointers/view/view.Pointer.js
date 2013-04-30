define([ 'BaseType', 'svgUtilities' ], function (extend, svgUtils) {

    return extend.extend({

        initialize : function (options) {

            _.bindAll(this, "destroy");

            this.svgUtils = svgUtils;
            this.model = options.model;
            var path = this._buildPath(this.model._getPointsArray());
            this.svgShape = this._createSvgShape(path, this.model.get("color"));
            this.svgUtils.setShapeOpacity(this.svgShape, false);
            this.model.on("change", this.render, this);
            this.model.on("destroy", this.destroy);
        },

        _createSvgShape : function (path, color) {
            return this.svgUtils.createPath(path, color);
        },

        render : function () {
            this.svgUtils.resetPath(this.svgShape, this._buildPath(this.model._getPointsArray()));
            this.svgUtils.setShapeOpacity(this.svgShape, this.model.get("opacity"));
            this.svgShape.toFront();
        },

        _buildPath : function (pointsArray) {
            return this.svgUtils.buildPath(pointsArray, true);
        },

        destroy : function () {
            this.svgShape.remove();
        }
    });
});

