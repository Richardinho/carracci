Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.DistalNode = Glenmorangie.Model.Element.extend({


    initialize : function (options) {
        Glenmorangie.Model.Element.prototype.initialize.call(this, options);
    },

    updateCoordinates : function (x, y) {
        Glenmorangie.Model.Element.prototype.updateCoordinates.call(this, x, y);

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

    updateFromArrowController : function (x, y) {
        this.set({ yCood : y});
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
