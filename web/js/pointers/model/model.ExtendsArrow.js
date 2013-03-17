Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ExtendsArrow = Glenmorangie.Model.Pointer.extend({


    initialize : function (options) {

        Glenmorangie.Model.Pointer.prototype.initialize.call(this, options);
    },

    _getPointsArray : function () {

        return [this.get("tip"), this.get("right"), this.get("left") ];
    },

    update : function (x, y) {
        var x = parseInt(x, 10);
        var y = parseInt(y, 10);


        switch(this.get('direction')) {

        case "top" :
            this.set({ tip: this._getPoint(x, y - 10),
                       right : this._getPoint(x + 10, y),
                       left : this._getPoint(x - 10, y)});
        break;

        case "bottom" :
            this.set({ tip: this._getPoint(x, y + 10),
                       right : this._getPoint(x + 10, y),
                       left : this._getPoint(x - 10, y)});
        break;

        case "left" :
            this.set({ tip: this._getPoint(x - 10, y),
                       right : this._getPoint(x, y - 10),
                       left : this._getPoint(x, y + 10)});
        break;

        case "right" :
            this.set({ tip: this._getPoint(x + 10, y),
                       right : this._getPoint(x, y + 10),
                       left : this._getPoint(x, y - 10)});
        break;
        }
    }



});