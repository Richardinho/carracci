Glenmorangie.namespace("Glenmorangie");

Glenmorangie.Element = Glenmorangie.utils.extend({

    listeners : [],

    initialize : function (options) {
        this.id = options.id;
        this.xCood = options.x;
        this.yCood = options.y;
    },

    _getId : function () {
        return this.id;
    },

    updateCoordinates : function (x, y) {
        this.setXCood(x);
        this.setYCood(y);
    },

    setXCood : function (x) {
        this.xCood = x;
    },

    setYCood : function (y) {
        this.yCood = y;
    },

    getXCood : function () {
        return this.xCood;
    },

    getYCood : function () {
        return this.yCood;
    },

    addListener : function (object, method) {
        this.listeners.push({ obj : object, action : method});
    },

    notifyListeners : function () {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            listener.obj[listener.action]( this.xCood, this.yCood );
        }
    },

});
