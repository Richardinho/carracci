define(["BaseType",
        "underscore",
        "diagram/connectors/nodes/nodeModel"],

        function (
             BaseType,
             _,
             NodeModel) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "_onMove", "_onStart", "_onEnd");

            this.view = options.view;
            this.mediator = options.mediator;
            this.orientation = options.orientation;

            this.model =  options.model;

            this.svgNode = this.view.getSvgNode();

            this.startX = null;
            this.startY = null;

            this.svgNode.dblclick(function () {

                this.model.fire("node-selected");

            }, this);

            this.svgNode.drag(this._onMove, this._onStart, this._onEnd);

            var that = this;
            if(this.orientation === "left"
                || this.orientation === "right"
                || this.orientation === "top"
                || this.orientation === "bottom") {

                this.svgNode.click(function (event) {
                    if(!event.altKey && event.shiftKey) {
                        if(!that._isAttached()) {
                            that.mediator.fireAttachRequest(that.orientation);
                        } else {
                            that.mediator.removeBoxNodeMediator(that.orientation);
                        }
                    }

                    else if(event.altKey && event.shiftKey) {
                        that.model.switchArrowHead();
                    }
                });
            }

            this.svgNode.click(function (event) {

                if(event.altKey && !event.shiftKey) {

                    that.mediator.changeLineStyle();
                }
            });
        },

        _isAttached : function () {

            return this.model.isAttached();
        },

        _onMove : function (dx, dy) {
            var x = this.startX + dx,
                y = this.startY + dy;

            this.mediator.update(this.orientation, x, y);
        },

        _onStart : function () {
            this.startX = parseInt(this.svgNode.attr("cx"));
            this.startY = parseInt(this.svgNode.attr("cy"));
        },

        _onEnd : function () {
            this.startX = null;
            this.startY = null;
        }






    });

});
