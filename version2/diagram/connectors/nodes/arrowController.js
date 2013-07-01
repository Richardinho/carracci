define(["core/BaseType", "underscore" ], function ( BaseType, _ ) {

    return BaseType.extend({

        initialize : function (options) {

            _.bindAll(this, "_onMove", "_onStart", "_onEnd");

            this.view = options.view;
            this.mediator = options.mediator;
            this.orientation = options.orientation;
            this.model = options.model;
            var f4 = false;

            this.svgNode = this.view.getSvgNode();

            this.startX = null;
            this.startY = null;

            this.svgNode.drag(this._onMove, this._onStart, this._onEnd);

            var that = this;


            this.model.on("f4Event", handleF4, this);

            this.svgNode.click(function (event) {
                if(event.shiftKey) {
                    if(!that._isAttached()) {
                        that.mediator.fireAttachRequest(that.orientation);
                    } else {
                        that.mediator.removeBoxNodeMediator(that.orientation);
                    }
                }
            });


            var flag = false;
            function handleF4 (value) {

                function changeLineStyle() {
                    that.mediator.changeLineStyle();
                }

                if(value && !flag) {
                    flag = true;
                    that.svgNode.mousedown(changeLineStyle);
                } else if(value = false) {
                    flag = false;
                    that.svgNode.unmousedown(changeLineStyle);
                }
            }
        },



        _isAttached : function () {

            return this.model.children['attached'].value;
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
