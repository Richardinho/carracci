Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ExtendsArrow = Glenmorangie.Model.Pointer.extend({


    initialize : function (options) {

        Glenmorangie.Model.Pointer.prototype.initialize.call(this, options);
    },

    _getPointsArray : function () {

        return [this.tip, this.right, this.left];
    },

    update : function (x, y) {
        var x = parseInt(x, 10);
        var y = parseInt(y, 10);

        this.centre = this._getPoint(x, y);

        switch(this.get('direction')) {

        case "up" :
            this.tip = this._getPoint(x, y - 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
        break;

        case "down" :
            this.tip = this._getPoint(x, y + 15);
            this.right = this._getPoint(x + 10, y);
            this.left = this._getPoint(x - 10, y);
        break;

        case "left" :
            this.tip = this._getPoint(x - 15, y);
            this.right = this._getPoint(x, y - 10);
            this.left = this._getPoint(x, y + 10);
        break;

        case "right" :
            this.tip = this._getPoint(x + 15, y);
            this.right = this._getPoint(x, y + 10);
            this.left = this._getPoint(x, y - 10);
        break;
        }
    }



});