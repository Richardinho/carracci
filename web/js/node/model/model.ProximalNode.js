Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ProximalNode = Glenmorangie.Model.Element.extend({


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
        if(this.distalNodeModel) {
            this.distalNodeModel.updateFromProximalNode(x,y);
        }
        this.connector.updateAll();
    },

    updateFromArrowController : function (x, y) {
        this.yCood = y;
    },

    updateFromDistalNode : function (x, y) {
        this.xCood = x;
    },

    //  injectors
    setArrowNodeModel : function (nodeModel) {
        this.arrowNodeModel = nodeModel;
    },

    setDistalNodeModel : function (nodeModel) {
        this.distalNodeModel = nodeModel;
    }



});
