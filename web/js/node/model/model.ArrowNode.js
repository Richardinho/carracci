Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ArrowNode = Glenmorangie.Model.Element.extend({


    initialize : function (options) {
        Glenmorangie.Model.Element.prototype.initialize.call(this, options);
        this.connector = options.connector;
        this.arrowModel = options.arrowModel;
    },

    updateCoordinates : function (x, y, callerId) {
        this.xCood = x;
        this.yCood = y;

        if( this.proximalNodeModel ) {

            this.proximalNodeModel.updateFromArrowController(x, y);

            if(this.xCood < this.proximalNodeModel.xCood) {
                this.arrowModel.setDirection("left");
            } else {
                this.arrowModel.setDirection("right");
            }
        }

        this.updateArrow(x, y);
        this.connector.updateAll();
    },

    updateFromProximalNode : function (x, y) {
        if(this.xCood < x) {
            this.arrowModel.setDirection("left");
        } else {
            this.arrowModel.setDirection("right");
        }
        this.yCood = y;
        this.updateArrow(x, y);
    },

    updateFromDistalNode : function (x, y) {
        if(this.xCood < x) {
            this.arrowModel.setDirection("left");
        } else {
            this.arrowModel.setDirection("right");
        }
        this.updateArrow(x, y);
    },

    updateArrow : function (x, y) {
        this.arrowModel.updatePath(this.xCood, this.yCood);
        // check if arrow direction needs to change.
        //this.arrowModel.updateCoordinates(this.xCood, this.yCood);
    },

    //  injectors
    setProximalNodeModel : function (nodeModel) {
        this.proximalNodeModel = nodeModel;
    },

    setDistalNodeModel : function(nodeModel) {
        this.distalNodeModel = nodeModel;
    }
});