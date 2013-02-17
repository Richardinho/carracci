Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.DistalNode = Glenmorangie.Model.Element.extend({


    initialize : function (options) {
        Glenmorangie.Model.Element.prototype.initialize.call(this, options);
    },

    update : function (x, y) {

        this.updateCoordinates(x, y);

        if( this.arrowNodeModel ) {
            this.arrowNodeModel.updateFromProximalNode(x, y);
        }

        if( this.distalNodeModel) {
            this.distalNodeModel.updateFromDistalNode(x, y);
        }

        if(this.lastNodeModel) {
            this.lastNodeModel.updateFromDistalNode(x, y);
        }
    },

    updateFromArrowController : function (y, validate) {
        var x = this.get('xCood');
        this.updateCoordinates(x, y, validate);
    },

    updateFromDistalNode : function (x, y) {
         this.set({ xCood : x});
    },

    updateFromLastNode : function (x, y) {
         this.set({ yCood : y});
    },

    //  injectors
    setArrowNodeModel : function (nodeModel) {
        this.arrowNodeModel = nodeModel;
    },

    setDistalNodeModel : function (nodeModel) {
        this.distalNodeModel = nodeModel;
    },

    setLastNodeModel : function (nodeModel) {
        this.lastNodeModel = nodeModel;
    }

});
