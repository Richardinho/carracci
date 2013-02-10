Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Pointer = Glenmorangie.Model.extend({


    initialize : function (options) {
        Glenmorangie.Model.prototype.initialize.call(this, options);

        this.set({ direction : options.direction, svgUtils : options.svgUtils, color : options.color }, { silent : true });

        this.update(options.x, options.y);

    },

    //  override
    update : function (x, y) {},

    show : function () {
        this.set({ opacity : true });
    },

    hide : function () {
        this.set({ opacity : false });
    },

    setDirection : function (direction) {
        this.set({ "direction" : direction });
    },

    _getPoint : function (x, y) {
        return { "x" : x, "y" : y };
    }

});