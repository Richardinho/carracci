define(["BaseType",
        "utility/svgUtilities" ],function (
            BaseType,
            svgUtils
        ) {


    return BaseType.extend({

        initialize : function (options) {


            this.modelA = options.modelA;
            this.modelB = options.modelB;
            this.connectorModel = options.connectorModel;

            this.line = svgUtils.createPath(this.buildPath(), "red");

            this.connectorModel.model.on("change", function () {

                this.updateLine();

            }, this);

            this.modelA.on("destroy", this.destroy, this);
        },

        destroy : function () {

            this.line.remove();
        },

        updateLine : function () {

            svgUtils.resetPath(this.line, this.buildPath());
            svgUtils.resetLine(this.line, this.connectorModel.getLineStyle());
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
