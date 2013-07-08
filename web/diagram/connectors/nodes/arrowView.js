define(["core/BaseType",
        "utility/svg",
         "diagram/connectors/nodes/arrow",
         "diagram/connectors/nodes/nodeModel"],function (
            BaseType,
            svg,
            Arrow,
            NodeModel
        ) {


    return BaseType.extend({

        initialize : function (options) {

            this.model = options.model;

            var cx = this.model.getXCood();
            var cy = this.model.getYCood();

            this.node = svg.circle(cx,cy, 10);

            this.node.attr({ fill : "green", opacity : 0, stroke : 0 });


            this.model.onXCood("change", this.updateX, this);
            this.model.onYCood("change", this.updateY, this);
            this.model.on("switchArrowHead", this.switchArrowHead, this);
            this.model.on("destroy", this.destroy, this);

            // if this an arrow node?
            if(this.model.isArrowNode() ) {

                this.arrow = new Arrow({
                    model : this.model
                })
            }
        },

        destroy : function () {
            if(this.model.isArrowNode()) {
                this.arrow.destroy();
            }
            this.node.remove();
        },

        switchArrowHead : function () {

            this.arrow.changeArrowHead();
        },

        getSvgNode : function () {
            return this.node;
        },

        updateX : function () {
            var cx = this.model.getXCood();
            this.node.attr({ cx : cx });

            if(this.arrow) {
                this.arrow.move();
            }

        },

        updateY : function () {
            var cy = this.model.getYCood();
            this.node.attr({ cy : cy });

            if(this.arrow) {
                this.arrow.move();
            }

        }





    });
});
