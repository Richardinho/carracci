Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Element = Glenmorangie.utils.extend({


    initialize : function (options) {
        this.id = options.id;
        this.xCood = options.x;
        this.yCood = options.y;
    },

    updateCoordinates : function (x, y) {
        this.xCood = x;
        this.yCood = y;
    }
});
