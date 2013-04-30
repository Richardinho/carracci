define(['ModelElement'], function (ModelElement) {

    return ModelElement.extend({


        initialize : function (options) {

            _.bindAll(this, "destroy")
            ModelElement.prototype.initialize.call(this, options);
        },

        update : function (x, y, validate) {

            ModelElement.prototype.update.call(this, x, y, validate);
        },

        updateFromArrowController : function (y, validate) {
            var x = this.get('xCood');
            this.updateCoordinates(x, y, validate);
        },

        updateFromDistalNode : function (x, y) {
             this.set({ xCood : x});
        },

        destroy : function () {
            this._fire("destroy");
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
        },

        getType : function () {
            return this.name + "Node";
        }

    });


});


