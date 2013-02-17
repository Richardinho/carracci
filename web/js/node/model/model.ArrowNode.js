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
        this.updateArrow();
    },

    changeLine : function () {
        this.connector.changeLine();
    },

    _getArrowModel : function () {
        return this.pointerCollection.get(this.pointerIndex);
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