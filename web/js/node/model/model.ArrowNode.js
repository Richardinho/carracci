Glenmorangie.namespace("Glenmorangie.Model");

Glenmorangie.Model.ArrowNode = Glenmorangie.Model.Element.extend({


    initialize : function (options) {
        Glenmorangie.Model.Element.prototype.initialize.call(this, options);
        this.pointerCollection = options.pointers;
        this.pointerIndex = 0;
        this._getArrowModel().show();
        this.connector = options.connector;
    },

    changePointer : function () {
        this._getArrowModel().hide();
        this.pointerIndex = ++this.pointerIndex % this.pointerCollection.size();
        this.updateArrow()
        this._getArrowModel().show();
    },

    update : function (x, y, validate) {
        this.updateCoordinates( x, y, validate);
        //this.updateProximalNode(validate);
        this.updateArrow();
    },


    updateProximalNode : function (validate) {
        if( this.proximalNodeModel ) {

            this.proximalNodeModel.updateFromArrowController(this.get('yCood'), validate);

            if(this.get('xCood') < this.proximalNodeModel.get('xCood')) {
                this._getArrowModel().setDirection("left");
            } else {
                this._getArrowModel().setDirection("right");
            }
        }

    },

    changeLine : function () {
        this.connector.changeLine();
    },

    _getArrowModel : function () {
        return this.pointerCollection.get(this.pointerIndex);
    },

    updateFromProximalNode : function (x, y) {

        this.updateCoordinates( this.get('xCood'), y);

        if(this.get('xCood')  < x) {
            this._getArrowModel().setDirection("left");
        } else {
            this._getArrowModel().setDirection("right");
        }
        this.updateArrow();
    },

    updateFromDistalNode : function (x, y) {
        if(this.get('xCood') < x) {
            this._getArrowModel().setDirection("left");
        } else {
            this._getArrowModel().setDirection("right");
        }
        this.updateArrow(x, y);
    },

    updateArrow : function () {
        this._getArrowModel().update(this.get('xCood'), this.get('yCood'));
    },

    //  injectors
    setProximalNodeModel : function (nodeModel) {
        this.proximalNodeModel = nodeModel;
    },

    setDistalNodeModel : function(nodeModel) {
        this.distalNodeModel = nodeModel;
    }


});