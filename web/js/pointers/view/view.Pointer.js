define([ 'utility/extend', 'svgUtilities' ], function (extend, svgUtils) {

    return extend.extend({

        initialize : function (options) {

            this.svgUtils = svgUtils;
            this.model = options.model;
            var path = this._buildPath(this.model._getPointsArray());
            this.svgShape = this._createSvgShape(path, this.model.get("color"));

            this.model.on("change", this.render, this);
        },

        _createSvgShape : function (path, color) {
            return this.svgUtils.createPath(path, color);
        },

        render : function () {
            this.svgUtils.resetPath(this.svgShape, this._buildPath(this.model._getPointsArray()));
            this.svgUtils.setShapeOpacity(this.svgShape, this.model.get("opacity"));
        },

        _buildPath : function (pointsArray) {
            return this.svgUtils.buildPath(pointsArray, true);
        }
    });
});

