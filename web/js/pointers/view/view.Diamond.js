Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.View.Diamond = Glenmorangie.utils.extend({


    initialize : function (options) {

        this.svgUtils = options.svgUtils;
        this.model = options.model;
        this.svgShape = this._createSvgShape("black");
    },

    render : function () {
        this.svgUtils.resetPath(this.svgShape, this.model.path);
    },

    _createSvgShape : function (color) {
        return this.svgUtils.createPath(this.model.path, color);
    }


});