Glenmorangie.namespace("Glenmorangie");

Glenmorangie.ArrowNode = Glenmorangie.DraggableElement.extend ({


    initialize : function (options) {

        Glenmorangie.DraggableElement.prototype.initialize.call(this, options);

        this.arrow = options.arrow;
    }
});