define(['ModelPointer'], function (ModelPointer) {

    return ModelPointer.extend({


        initialize : function (options) {

            ModelPointer.prototype.initialize.call(this, options);
        },

        _getPointsArray : function () {

            return [this.get("tip"), this.get("right"), this.get("left") ];
        },

        getOffset : function () {
            return -20;
        },

        update : function (x, y) {

            var x = parseInt(x, 10);
            var y = parseInt(y, 10);

            //this.set({ centre : this._getPoint(x, y)});

            switch(this.get('direction')) {

            case "top" :
                this.set({ tip: this._getPoint(x, y),
                           right : this._getPoint(x + 10, y + 10),
                           left : this._getPoint(x - 10, y + 10)});
                           //bottom : this._getPoint(x, y + 20) });
            break;

            case "bottom" :
                this.set({ tip: this._getPoint(x, y ),
                           right : this._getPoint(x + 10, y - 10),
                           left : this._getPoint(x - 10, y - 10) });
                           //bottom : this._getPoint(x, y - 20) });
            break;

            case "left" :
                this.set({ tip: this._getPoint(x, y),
                           right : this._getPoint(x + 10, y - 10),
                           left : this._getPoint(x + 10, y + 10) });
                           //bottom : this._getPoint(x + 20, y)});
            break;

            case "right" :
                this.set({ tip: this._getPoint(x , y),
                           right : this._getPoint(x - 10, y + 10),
                           left : this._getPoint(x - 10, y - 10)});
                           //bottom : this._getPoint(x - 20, y)});
            break;
            }

        }
    });
});