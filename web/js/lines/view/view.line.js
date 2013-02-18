Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.Line = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.model = options.model;
        this.svgUtils = options.svgUtils;
        this.line = this._createSvgShape("black");
        this.model.on("change", this.render, this);
        this.model.on("change:style", this.resetLine, this);
    },

    _createSvgShape : function (color) {
        var path = this.svgUtils.buildPath(this.model.getPointsArray(), false);
        console.log("create path", path)
        return this.svgUtils.createPath(path, color);
    },

    render : function () {
        var path = this.svgUtils.buildPath(this.model.getPointsArray(), false);
        console.log("render path: ", path)
        this.svgUtils.resetPath(this.line, path);

    },
    resetLine : function () {
        this.svgUtils.resetLine(this.line, this.model.get("style"));
    }

});