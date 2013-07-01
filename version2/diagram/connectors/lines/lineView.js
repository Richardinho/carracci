define(["core/BaseType",
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

        },

        updateLine : function () {

            svgUtils.resetPath(this.line, this.buildPath());
            svgUtils.resetLine(this.line, this.connectorModel.getLineStyle());
        },

        buildPath : function () {

            var aXCood = this.modelA.children['xCood'].value;
            var aYCood = this.modelA.children['yCood'].value;

            var bXCood = this.modelB.children['xCood'].value;
            var bYCood = this.modelB.children['yCood'].value;

            // create line here.
            return svgUtils.buildPath([
                { x : aXCood, y : aYCood },
                { x : bXCood, y : bYCood }], false);


        }







    });
});
