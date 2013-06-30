define(["core/BaseType",
        "utility/svg" ],function (
            BaseType,
            svg
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            var cx = this.model.children['xCood'].value;
            var cy = this.model.children['yCood'].value;

            this.node = svg.circle(cx,cy, 10);

            this.node.attr({ fill : "green" });

            this.model.children['xCood'].on("change", this.updateX, this);
            this.model.children['yCood'].on("change", this.updateY, this);


        },

        getSvgNode : function () {
            return this.node;
        },

        updateX : function () {
            var cx = this.model.children['xCood'].value;
            this.node.attr({ cx : cx });

        },

        updateY : function () {
            var cy = this.model.children['yCood'].value;
            this.node.attr({ cy : cy });

        }





    });
});
