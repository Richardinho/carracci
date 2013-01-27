Glenmorangie.namespace("Glenmorangie.View");

Glenmorangie.View.Line = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.model = options.model;
        this.svgUtils = options.svgUtils;
        this.line = this._createSvgShape("black");
    },

    _createSvgShape : function (color) {
        var path = this.model.path;
        return this.svgUtils.createPath(path, color);
    },

    //  called from connector
    render : function () {
        this.svgUtils.resetPath(this.line, this.model.path);
    }

});