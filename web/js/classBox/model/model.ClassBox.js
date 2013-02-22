Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ClassBox = Glenmorangie.Model.Element.extend({

    initialize : function (options) {

        Glenmorangie.Model.Element.prototype.initialize.call(this, options);

        this.set({ className : options.className });
        this.set({ methods : options.methods });
        this.set({ height : options.height });
        this.set({ width : options.width });
        this.set({ properties : options.properties });
    },

    update : function (x, y) {
        this.updateCoordinates(x, y);
    },

    getWidth : function () {
        return this.get('width')
    },

    addMethod : function(method) {
        this.get('methods').push(method);
    },

    addProperty : function (property) {
        this.get('properties').push(property);
    }









});