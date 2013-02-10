Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.Element = Glenmorangie.Model.extend({


    initialize : function (options) {
        Glenmorangie.Model.prototype.initialize.call(this, options);
        this.id = options.id;
        this.set({ xCood : options.x});
        this.set({ yCood : options.y});
    },

    updateCoordinates : function (x, y) {
        this.set({ xCood : x});
        this.set({ yCood : y});
    },

});
