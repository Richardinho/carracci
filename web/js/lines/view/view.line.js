define(['BaseType', 'svgUtilities'], function (extend, svgUtils) {

    return extend.extend({

        initialize : function (options) {

            this.model = options.model;
            this.svgUtils = svgUtils;
            this.line = this._createSvgShape("black");
            this.model.on("change", this.render, this);
            this.model.on("change:style", this.resetLine, this);
        },

        _createSvgShape : function (color) {
            var path = this.svgUtils.buildPath(this.model.getPointsArray(), false);
            return this.svgUtils.createPath(path, color);
        },

        render : function () {
            var path = this.svgUtils.buildPath(this.model.getPointsArray(), false);
            this.svgUtils.resetPath(this.line, path);

        },
        resetLine : function () {
            this.svgUtils.resetLine(this.line, this.model.get("style"));
        }
    });
});

