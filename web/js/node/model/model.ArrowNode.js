//  Model.ArrowNode

define(['ModelElement'], function (ModelElement) {

    return ModelElement.extend({


        initialize : function (options) {

            _.bindAll(this, "destroy");
            ModelElement.prototype.initialize.call(this, options);
            this.name = options.name;
            this.pointerCollection = options.pointers;
            this.pointerIndex = 0;
            this._getArrowModel().show();
            this.lineContainer = options.lineContainer;
            this.componentId = options.componentId
        },

        changePointer : function () {
            this._getArrowModel().hide();
            this.pointerIndex = ++this.pointerIndex % this.pointerCollection.size();
            this.updateArrow()
            this._getArrowModel().show();
        },

        destroy : function () {
            this.pointerCollection.each(function (i) {
                this.get(i).destroy();
            });
            this._fire("destroy");
        },

        update : function (x, y, validate) {
            ModelElement.prototype.update.call(this, x, y, validate);
            this.updateArrow();
        },

        changeLine : function () {
            this.lineContainer.changeLine();
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
        },

        detatch : function () {
            this.attachmentCoordinator.destroy();
        },

        removeCoordinator : function (id) {
            this.coordinators.deleteModel(id);
            this.set({ "connectedToBox": false });
        },

        getType : function () {
            return this.name + "ArrowNode";
        }


    });
});
