define([
    "BaseType",
    "utility/svgUtilities"
    ],function (
        BaseType,
        svgUtils
        ) {

    "use strict";

    return BaseType.extend({

        initialize : function (options) {


            this.modelA = options.modelA;
            this.modelB = options.modelB;
            this.connectorModel = options.connectorModel;

            this.line = svgUtils.createPath(this.buildPath(), "red");

            // the idea is to update the model then everything else listens to changes on it.
            this.connectorModel.on("change", this.updateLine, this);
            this.connectorModel.on("change:lineStyle", this.updateLineStyle, this);
            this.connectorModel.on("selected", this.selectLine, this);

            this.connectorModel.on("delete", this.destroy, this);
        },

        destroy : function () {
            console.log("lineView, destroy()");
            this.line.remove();
        },

        selectLine : function () {

            this.line.attr("stroke", "orange");

        },

        updateLine : function () {

            svgUtils.resetPath(this.line, this.buildPath());

        },

        updateLineStyle : function () {

            svgUtils.resetLineStyle(this.line, this.connectorModel.getLineStyle());
        },

        buildPath : function () {

            var aXCood = this.modelA.getXCood();
            var aYCood = this.modelA.getYCood();

            var bXCood = this.modelB.getXCood();
            var bYCood = this.modelB.getYCood();

            // create line here.
            return svgUtils.buildPath([
                { x : aXCood, y : aYCood },
                { x : bXCood, y : bYCood }], false);


        }







    });
});
