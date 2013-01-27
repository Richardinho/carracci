Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ArrowNode = Glenmorangie.DraggableElement.extend ({


    initialize : function (options) {

        Glenmorangie.DraggableElement.prototype.initialize.call(this, options);

        this.arrow = options.arrow;
        this.direction = options.direction;
    },

    updateCoordinates : function (x, y) {

        this.arrow.updatePath(x, y);
        Glenmorangie.Element.prototype.updateCoordinates.call(this, x, y);
        this.updateArrowState();
    },

    render : function () {
        Glenmorangie.SvgElement.prototype.render.call(this);
        this.arrow.render();
    },

    setProximalNode : function (nodeModel) {
        this.proximalNodeModel = nodeModel;
    },

    updateArrowState : function () {
        // abstract method
    }
});