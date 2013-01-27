Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.DistalNode = Glenmorangie.Model.Element.extend({


    initialize : function (options) {
        Glenmorangie.Model.Element.prototype.initialize.call(this, options);
        this.connector = options.connector;
    },

    updateCoordinates : function (x, y, callerId) {
        this.xCood = x;
        this.yCood = y;

        if( this.arrowNodeModel ) {
            this.arrowNodeModel.updateFromProximalNode(x, y);
        }

        if( this.distalNodeModel) {
            this.distalNodeModel.updateFromDistalNode(x, y);
        }

        if(this.lastNodeModel) {
            this.lastNodeModel.updateFromDistalNode(x, y);
        }
        this.connector.updateAll();
    },

    updateFromArrowController : function (x, y) {
        this.yCood = y;
    },

    updateFromDistalNode : function (x, y) {
        this.xCood = x;
    },

    updateFromLastNode : function (x, y) {
        this.yCood = y;
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
